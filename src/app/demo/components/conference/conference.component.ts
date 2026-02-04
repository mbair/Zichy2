import { Component, isDevMode, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { urlValidator } from '../../utils/url-validator';
import { emailDomainValidator } from '../../utils/email-validator';
import { allLanguagesRequiredValidator } from '../../utils/all-languages-required-validator';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ConferenceService } from '../../service/conference.service';
import { ResponsiveService } from '../../service/responsive.service';
import { QuestionService } from '../../service/question.service';
import { ApiService } from '../../service/api.service';
import { MessageService } from 'primeng/api';
import { UserService } from '../../service/user.service';
import { MealService } from '../../service/meal.service';
import { ApiResponse } from '../../api/ApiResponse';
import { Conference, FormFieldInfo } from '../../api/conference';
import { User } from '../../api/user';
import { Table } from 'primeng/table';
import * as moment from 'moment';
moment.locale('hu')

type Option = { label: string; value: string }

@Component({
    selector: 'conference',
    templateUrl: './conference.component.html',
    providers: [MessageService]
})

// Makes unsubscribe automatically, don't need to do manually in ngOnDestroy
// BUT!!! Don't delete ngOnDestroy, it has to stay here!
@AutoUnsubscribe()

export class ConferenceComponent implements OnInit {

    loading: boolean = true                      // Loading overlay trigger value
    cols: any[] = []                             // Table columns
    tableItem: Conference = {}                   // One conference object
    tableData: Conference[] = []                 // Data set displayed in a table
    rowsPerPageOptions = [20, 50, 100]           // Possible rows per page
    rowsPerPage: number = 20                     // Default rows per page
    totalRecords: number = 0                     // Total number of rows in the table
    page: number = 0                             // Current page
    sortField: string = 'beginDate'              // Current sort field
    sortOrder: number = 1                        // Current sort order
    globalFilter: string = ''                    // Global filter
    filterValues: { [key: string]: string } = {} // Table filter conditions
    debounce: { [key: string]: any } = {}        // Search delay in filter field
    conferenceForm: FormGroup                    // Form to create/update conference
    questionsForm: FormGroup                     // Form to manage questions of the conference
    formFieldInfosForm: FormGroup                // Form to manage questions of the conference
    originalFormValues: any                      // The original values ​​of the form
    originalQuestionsFormValues: any             // The original values ​​of the questions form
    originalFormFieldInfosFormValues: any        // The original values of the form field infos form
    sidebar: boolean = false                     // Table item maintenance sidebar
    formFieldsInfosSidebar: boolean = false      // Form fields maintenance sidebar
    formFieldsInfosPosition: Option[] = []       // Form fields informations position
    questionsSidebar: boolean = false            // Questions maintenance sidebar
    deleteDialog: boolean = false                // Popup for deleting table item
    bulkDeleteDialog: boolean = false            // Popup for deleting table items
    selected: Conference[] = []                  // Table items chosen by user
    meals: any[] = []                            // Possible meals
    organizer: User | null = null                // Organizer of the expanded conference
    canCreate: boolean = false                   // User has permission to create new user
    canEdit: boolean = false                     // User has permission to update user
    canDelete: boolean = false                   // User has permission to delete user
    isOrganizer: boolean = false                 // User has organizer role
    loggedInUserId: number                       // Logged in user id
    isMobile: boolean = false                    // Mobile screen detection

    FORM_FIELD_INFOS_CONFIG = [
        { field: 'lastName', label: 'Vezetéknév' },
        { field: 'firstName', label: 'Keresztnév' },
        { field: 'gender', label: 'Neme' },
        { field: 'birthDate', label: 'Születési dátum' },
        { field: 'nationality', label: 'Állampolgárság' },
        { field: 'country', label: 'Lakóhely - ország' },
        { field: 'zipCode', label: 'Lakóhely - irányítószám' },
        { field: 'email', label: 'Email' },
        { field: 'telephone', label: 'Telefon' },
        { field: 'dateOfArrival', label: 'Érkezés dátuma' },
        { field: 'firstMeal', label: 'Első étkezés' },
        { field: 'diet', label: 'Étrend' },
        { field: 'dateOfDeparture', label: 'Távozás dátuma' },
        { field: 'lastMeal', label: 'Utolsó étkezés' },
        { field: 'babyBed', label: 'Babaágyat kérsz?' },
        { field: 'roomType', label: 'Szállástípus' },
        { field: 'climate', label: 'Klímát kérsz?' },
        { field: 'roomMate', label: 'Kivel laknál egy szobában' },
        { field: 'payment', label: 'Fizetési mód' },
    ]

    private initialFormValues = {
        id: null,
        name: '',
        beginDate: '',
        endDate: '',
        firstMeal: '',
        lastMeal: '',
        contractorName: '',
        contractorAdress: '',
        contractorTaxNumber: '',
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        formUrl: '',
        registrationEndDate: '',
        guestEditEndDate: '',
        organizer_user_id: '',
        enabled: true,
        acceptanceCriteriaUrl: '',
        paymentMethod: '',
    }

    private isFormValid$: Observable<boolean>
    private formChanges$: Subject<void> = new Subject()
    private conferenceObs$: Observable<any> | undefined
    private serviceMessageObs$: Observable<any> | undefined
    private questionMessageObs$: Observable<any> | undefined

    constructor(
        public userService: UserService,
        private router: Router,
        private formBuilder: FormBuilder,
        private layoutService: LayoutService,
        private conferenceService: ConferenceService,
        private questionService: QuestionService,
        private mealService: MealService,
        private apiService: ApiService,
        private messageService: MessageService,
        private responsiveService: ResponsiveService) {

        // Set default theme
        this.changeTheme('indigo')

        // Conference form fields and validators
        this.conferenceForm = this.formBuilder.group({
            id: [this.initialFormValues.id],
            name: [this.initialFormValues.name, Validators.required],
            beginDate: [this.initialFormValues.beginDate, Validators.required],
            endDate: [this.initialFormValues.endDate, Validators.required],
            firstMeal: [this.initialFormValues.firstMeal, Validators.required],
            lastMeal: [this.initialFormValues.lastMeal, Validators.required],
            contractorName: [this.initialFormValues.contractorName, Validators.required],
            contractorAdress: [this.initialFormValues.contractorAdress, Validators.required],
            contractorTaxNumber: [this.initialFormValues.contractorTaxNumber, [Validators.required]],
            contactName: [this.initialFormValues.contactName, Validators.required],
            contactEmail: [this.initialFormValues.contactEmail, [Validators.required, emailDomainValidator()]],
            contactPhone: [this.initialFormValues.contactPhone, Validators.required],
            formUrl: [this.initialFormValues.formUrl, Validators.required],
            registrationEndDate: [this.initialFormValues.registrationEndDate, Validators.required],
            guestEditEndDate: [this.initialFormValues.guestEditEndDate, Validators.required],
            organizer_user_id: [this.initialFormValues.organizer_user_id],
            enabled: [this.initialFormValues.enabled, { nonNullable: true }],
            acceptanceCriteriaUrl: [this.initialFormValues.acceptanceCriteriaUrl, [urlValidator()]],
            paymentMethod: [this.initialFormValues.paymentMethod, Validators.required],
        })

        this.isFormValid$ = new BehaviorSubject<boolean>(false)

        // Monitor the name field changes
        this.conferenceForm.get('name')?.valueChanges.subscribe(nameValue => {

            const productionURL = this.apiService.productionURL
            const developmentURL = this.apiService.developmentURL
            const url = isDevMode() ? developmentURL : productionURL

            // Create a slug from the name
            let slug = this.slugify(nameValue)

            // Set the slug in the form
            this.conferenceForm.patchValue({
                formUrl: `${url}/#/conference-form/${slug}`
            })
        })

        // Form fields infos
        this.initializeFormFieldInfosForm()

        // Questions form fields and validations
        this.initializeQuestionsForm()
    }

    ngOnInit() {
        // Permissions
        this.userService.hasRole(['Super Admin', 'Nagy Admin']).subscribe(canCreate => this.canCreate = canCreate)
        this.userService.hasRole(['Super Admin', 'Nagy Admin']).subscribe(canEdit => this.canEdit = canEdit)
        this.userService.hasRole(['Super Admin', 'Nagy Admin']).subscribe(canDelete => this.canDelete = canDelete)
        this.userService.hasRole(['Szervezo']).subscribe(isOrganizer => this.isOrganizer = isOrganizer)
        this.loggedInUserId = this.userService.getLoggedInUserId()

        // Default filter values
        this.filterValues['enabled'] = '1'

        // Conferences
        this.conferenceObs$ = this.conferenceService.conferenceObs;
        this.conferenceObs$.subscribe((data: ApiResponse) => {
            this.loading = false
            if (data) {
                this.tableData = data.rows || []
                this.totalRecords = data.totalItems || 0
                this.page = data.currentPage || 0
            }
        })

        // Get meals for selector
        this.meals = this.mealService.getMealsForSelector()

        // Monitor the changes of the window size
        this.responsiveService.isMobile$.subscribe((isMobile) => {
            this.isMobile = isMobile
        })

        // Form validation
        this.isFormValid$ = this.formChanges$.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            map(() => this.conferenceForm.valid)
        )

        // Monitor the changes of the form
        this.conferenceForm.valueChanges.subscribe(() => this.formChanges$.next())

        // Message
        this.serviceMessageObs$ = this.conferenceService.messageObs
        this.serviceMessageObs$.subscribe(message => this.handleMessage(message))

        // Question Message
        this.questionMessageObs$ = this.questionService.messageObs
        this.questionMessageObs$.subscribe(message => this.handleMessage(message))
    }

    // Getters for form validation
    get id() { return this.conferenceForm.get('id') }
    get name() { return this.conferenceForm.get('name') }
    get beginDate() { return this.conferenceForm.get('beginDate') }
    get endDate() { return this.conferenceForm.get('endDate') }
    get firstMeal() { return this.conferenceForm.get('firstMeal') }
    get lastMeal() { return this.conferenceForm.get('lastMeal') }
    get contractorName() { return this.conferenceForm.get('contractorName') }
    get contractorAdress() { return this.conferenceForm.get('contractorAdress') }
    get contractorTaxNumber() { return this.conferenceForm.get('contractorTaxNumber') }
    get contactName() { return this.conferenceForm.get('contactName') }
    get contactEmail() { return this.conferenceForm.get('contactEmail') }
    get contactPhone() { return this.conferenceForm.get('contactPhone') }
    get formUrl() { return this.conferenceForm.get('formUrl') }
    get registrationEndDate() { return this.conferenceForm.get('registrationEndDate') }
    get guestEditEndDate() { return this.conferenceForm.get('guestEditEndDate') }
    get enabled() { return this.conferenceForm.get('enabled') }
    get acceptanceCriteriaUrl() { return this.conferenceForm.get('acceptanceCriteriaUrl') }
    get paymentMethod() { return this.conferenceForm.get('paymentMethod') }

    // Gets the FormArray of questions
    get questions(): FormArray {
        return this.questionsForm.get('questions') as FormArray
    }

    get formFieldInfosArray(): FormArray {
        return this.formFieldInfosForm.get('fields') as FormArray
    }

    get formFieldInfosQuestions(): FormArray {
        return this.formFieldInfosForm.get('questions') as FormArray
    }

    /**
     * Load filtered data into the Table
     * @returns
     */
    doQuery() {
        this.loading = true

        const filters = Object.keys(this.filterValues)
            .map(key => this.filterValues[key].length > 0 ? `${key}=${this.filterValues[key]}` : '')
        const queryParams = filters.filter(x => x.length > 0).join('&')

        if (this.globalFilter !== '') {
            return this.conferenceService.getBySearch(this.globalFilter, { sortField: this.sortField, sortOrder: this.sortOrder })
        }

        return this.conferenceService.get(this.page, this.rowsPerPage, { sortField: this.sortField, sortOrder: this.sortOrder }, queryParams)
    }

    /**
     * Filter table by column
     * @param event
     * @param field
     */
    onFilter(event: any, field: string) {
        const noWaitFields = ['beginDate', 'endDate', 'firstMeal', 'lastMeal', 'enabled']
        let filterValue = ''

        // For enabled field convert true to "1" and false to "0"
        if (field === 'enabled') {
            filterValue = event
        }
        // Calendar date as String
        else if (event instanceof Date) {
            const date = moment(event)
            filterValue = date.format('YYYY.MM.DD')
        } else {
            if (event && (event.value || event.target?.value)) {
                filterValue = event.value || event.target?.value
                filterValue = filterValue.toString()
            } else {
                this.filterValues[field] = ''
            }
        }

        this.filterValues[field] = filterValue

        // If the field is a dropdown, run doQuery immediately
        if (noWaitFields.includes(field)) {
            if (this.filterValues[field] === filterValue) {
                this.doQuery()
            }
            // otherwise wait for the debounce time
        } else {
            if (this.debounce[field]) {
                clearTimeout(this.debounce[field])
            }

            this.debounce[field] = setTimeout(() => {
                if (this.filterValues[field] === filterValue) {
                    this.doQuery()
                }
            }, 500)
        }
    }

    /**
     * Lazy mode is handy to deal with large datasets, instead of loading
     * the entire data, small chunks of data is loaded by invoking onLazyLoad
     * callback every time paging, sorting and filtering happens.
     * @param event
     */
    onLazyLoad(event: any) {
        this.page = event.first! / event.rows!
        this.rowsPerPage = event.rows ?? this.rowsPerPage
        this.sortField = event.sortField ?? ''
        this.sortOrder = event.sortOrder ?? 1
        this.globalFilter = event.globalFilter ?? ''
        this.doQuery()
    }

    /**
     * Filter table by any column
     * @param table
     * @param event
     */
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
    }

    /**
     * When a row is expanded, load the organizer data.
     * If the conference has an organizer, load the organizer's data from the user service.
     * @param conference The conference object for the row that was expanded.
     */
    onRowExpand(conference: Conference): void {
        this.organizer = null

        // Load organizer data
        const organizerId = conference?.organizer_user_id
        if (organizerId) {
            this.userService.getUserById(organizerId).subscribe((user: User | null) => {
                this.organizer = user
            })
        }
    }

    /**
     * Handles service response messages and reset selected table item(s)
     * After the message is shown, query for data changes
     * @param message service response message
     */
    handleMessage(message: any) {
        if (!message) return

        this.loading = false

        if (message == 'ERROR') {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Hiba történt!'
            })
        } else {
            // Show service response message
            this.messageService.add(message)

            // Reset selected table Item(s)
            this.tableItem = {}
            this.selected = []

            // Query for data changes
            this.doQuery()
        }
    }

    /**
     * Initializes the form field infos form
     */
    initializeFormFieldInfosForm(fieldInfos?: FormFieldInfo[]) {

        this.formFieldsInfosPosition = [
            { label: 'Mező alatti szöveg', value: 'text' },
            { label: 'Információs buborék', value: 'bubble' }
        ]

        // Reinitialize the form, including the questions FormArray
        this.formFieldInfosForm = this.formBuilder.group({
            conferenceId: [this.tableItem.id, Validators.required],
            fields: this.formBuilder.array(
                this.FORM_FIELD_INFOS_CONFIG.map(cfg => {
                    const found = fieldInfos?.find(f => f.field === cfg.field)
                    return this.formBuilder.group({
                        field: [cfg.field],
                        info: this.formBuilder.group({
                            hu: [found?.info['hu'] || ''],
                            en: [found?.info['en'] || ''],
                        }),
                        position: [found?.position || 'text'],
                    }, { validators: allLanguagesRequiredValidator() })
                })
            )
        })

        // Store original values for comparison
        this.originalFormFieldInfosFormValues = this.formFieldInfosForm.value
    }

    /**
     * Initializes the questions form, setting default values from the questions array.
     * @remarks
     * The form is created with a control for each question in the questions array.
     * The name of each control is in the format `question_<id>_<lang>`, where <id> is the
     * question ID and <lang> is the language code.
     * The default value for each control is set to the question's translation for the
     * corresponding language.
     */
    initializeQuestionsForm() {
        const q = this.tableItem.questions
        const maxQuestions = 5

        // Extract existing translations from all questions
        const existingQuestions: any[] = []

        if (q && q.length > 0) {
            q.forEach((question: any) => {
                if (question.translations) {
                    // Check if translations is an array or object
                    if (Array.isArray(question.translations)) {
                        // If it's an array, add each translation
                        question.translations.forEach((translation: any) => {
                            // Only add if at least one language has content
                            if (translation.hu || translation.en) {
                                existingQuestions.push(translation)
                            }
                        });
                    } else {
                        // If it's an object, add it directly
                        // Only add if at least one language has content
                        if (question.translations.hu || question.translations.en) {
                            existingQuestions.push(question.translations)
                        }
                    }
                }
            })
        }

        // Reinitialize the form, including the questions FormArray
        this.questionsForm = this.formBuilder.group({
            conferenceid: [this.tableItem.id],
            questions: this.formBuilder.array([])
        })

        // Use local variable instead of this.questions getter
        const questionsArray = this.questionsForm.get('questions') as FormArray

        // Fill form with stored questions
        existingQuestions.forEach((question: any) => {
            questionsArray.push(this.formBuilder.group({
                hu: [question.hu],
                en: [question.en]
            }, { validators: allLanguagesRequiredValidator() }))
        })

        // Add empty questions if needed
        const missingQuestions = maxQuestions - questionsArray.length;
        for (let i = 0; i < missingQuestions; i++) {
            questionsArray.push(this.formBuilder.group({
                hu: [''],
                en: ['']
            }, { validators: allLanguagesRequiredValidator() }))
        }

        // Store original values for comparison
        this.originalQuestionsFormValues = this.questionsForm.value
    }


    /**
     * Generates a slugified formUrl based on the name of the conference,
     * and assigns it to the tableItem
     * Takes env into account, doesn't link to PROD on DEV
     */
    setFormUrl() {
        let formUrl = this.tableItem.name || ''
        formUrl = this.slugify(formUrl)
        this.tableItem.formUrl = `/conference-form/${formUrl}`
    }

    /**
     * Navigates to the conference form page, with the formUrl slugified from the
     * conference name.
     * 
     * @param conference the conference object
     */
    navigateToConferenceForm(conference: any) {
        const formUrl = this.slugify(conference.name)
        this.router.navigate(['/conference-form', formUrl])
    }

    /**
     * Create new Conference
     */
    create() {
        this.conferenceForm.reset(this.initialFormValues)

        // Store original values for Cancel (create mode)
        this.originalFormValues = this.conferenceForm.getRawValue()

        this.sidebar = true
    }

    /**
     * Edit the Conference
     * @param conference
     */
    edit(conference: Conference) {
        this.conferenceForm.reset(this.initialFormValues)
        this.conferenceForm.patchValue(conference)

        // Store original values for Cancel (edit mode)
        this.originalFormValues = this.conferenceForm.getRawValue()

        // Force validation + reveal already-invalid persisted values
        this.conferenceForm.updateValueAndValidity({ emitEvent: false })
        this.markInvalidControlsTouched(this.conferenceForm)

        this.sidebar = true
    }

    /**
     * Delete the Conference
     */
    delete() {
        this.loading = true
        this.deleteDialog = false
        this.conferenceService.delete(this.tableItem)
    }

    /**
     * Delete selected Conferences
     */
    deleteSelected() {
        this.loading = true
        this.deleteDialog = false
        this.conferenceService.bulkdelete(this.selected)
    }

    /**
     * Saving the form
     */
    save() {
        this.conferenceForm.markAllAsTouched()
        this.conferenceForm.updateValueAndValidity()

        this.loading = true
        const formValues = this.conferenceForm.value

        if (!formValues.id) {
            this.conferenceService.create(formValues)
        } else {
            this.conferenceService.update(formValues)
        }

        this.sidebar = false
    }

    /**
     * Cancel saving the form
     */
    cancel() {
        // Fallback to initial values if original is missing for any reason
        this.conferenceForm.reset(this.originalFormValues ?? this.initialFormValues)
    }

    /**
     * Edit the questions of the Conference
     * @param conference
     */
    editFormFieldInfos(conference: Conference) {
        this.tableItem = conference
        this.formFieldInfosForm.reset()
        this.initializeFormFieldInfosForm(conference.formFieldInfos)
        this.formFieldsInfosSidebar = true
    }

    /**
     * Saving the form field infos form
     */
    saveFormFieldInfos() {
        if (this.formFieldInfosForm.invalid) return

        const val = this.formFieldInfosForm.value

        // Only where at least one language is filled in
        const infosToSave = val.fields.filter(
            (f: { info: { hu: string; en: string } }) => f.info.hu?.trim() || f.info.en?.trim()
        )

        const updatedConference = {
            ...this.tableItem,
            formFieldInfos: infosToSave
        }

        this.conferenceService.update(updatedConference)
        this.formFieldsInfosSidebar = false
    }

    /**
     * Cancel saving the form field infos form
     */
    cancelFormFieldInfos() {
        this.formFieldInfosForm.reset(this.originalFormFieldInfosFormValues)
    }

    /**
     * Edit the questions of the Conference
     * @param conference
     */
    editQuestions(conference: Conference) {
        this.tableItem = conference
        this.questionsForm.reset()
        this.initializeQuestionsForm()
        this.questionsSidebar = true
    }

    /**
     * Saving the questions form
     */
    saveQuestions() {
        this.loading = true
        const questions = {
            id: this.tableItem.questions && this.tableItem.questions[0]?.id ? this.tableItem.questions[0].id : null,
            conferenceid: this.tableItem.id,
            translations: this.questionsForm.value.questions,
        }
        // Question insert
        if (questions.id == null) {
            this.questionService.create(questions)
        }
        // Question update
        else {
            this.questionService.update(questions)
        }
        this.questionsSidebar = false
    }

    /**
     * Cancel saving the questions form
     */
    cancelQuestions() {
        this.questionsForm.reset(this.originalQuestionsFormValues)
    }

    /**
     * Converts a string to its slug form
     * @param str string to be slugified
     * @returns slugified string
     */
    slugify(str: string) {
        if (!str) return '';

        // Define replacements for accented Hungarian characters
        const map: { [key: string]: string } = {
            'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ö': 'o', 'ő': 'o',
            'ú': 'u', 'ü': 'u', 'ű': 'u', 'Á': 'A', 'É': 'E', 'Í': 'I',
            'Ó': 'O', 'Ö': 'O', 'Ő': 'O', 'Ú': 'U', 'Ü': 'U', 'Ű': 'U'
        }

        // Replace accented characters
        str = str.split('')
            .map(char => map[char] || char) // Replace if in map
            .join('')

        str = str.trim()                        // trim leading/trailing white space
            .toLowerCase()                 // convert string to lowercase
            .replace(/[^a-z0-9 -]/g, '')   // remove any non-alphanumeric characters
            .replace(/\s+/g, '-')          // replace spaces with hyphens
            .replace(/-+/g, '-')           // remove consecutive hyphens

        return str
    }

    /**
     * Copy the URL to the clipboard
     * @param url
     */
    copyUrl(url: string) {
        if (!url) return
        navigator.clipboard.writeText(url)
        this.messageService.add({
            severity: 'success',
            summary: 'Link a vágólapra másolva',
            detail: url
        })
    }

    // Get the style class for a meal
    getMealStyle(meal: string) {
        switch (meal) {
            case 'reggeli':
                return 'breakfast'
            case 'ebéd':
                return 'lunch'
            case 'vacsora':
                return 'dinner'
            default:
                return 'nothing'
        }
    }

    /**
     * Replaces the theme link with a new one.
     * @param href The href attribute of the new link element.
     * @param onComplete Called when the new style sheet is loaded.
     * This method is used to switch the app's theme.
     * It creates a clone of the current theme link, sets its href to the given one,
     * inserts the clone after the original link, and then removes the original link.
     * When the new style sheet is loaded, it calls the onComplete callback.
     */
    replaceThemeLink(href: string, onComplete: () => void) {
        const themeLink = <HTMLLinkElement>document.getElementById('theme-link')
        const cloneLinkElement = <HTMLLinkElement>themeLink.cloneNode(true)

        cloneLinkElement.setAttribute('href', href)
        cloneLinkElement.setAttribute('id', 'theme-link-clone')

        themeLink.parentNode!.insertBefore(cloneLinkElement, themeLink.nextSibling)

        cloneLinkElement.addEventListener('load', () => {
            themeLink.remove()
            cloneLinkElement.setAttribute('id', 'theme-link')
            onComplete()
        })
    }

    /**
     * Switches the theme to the given one.
     * @param theme The name of the theme to switch to.
     * Finds the theme CSS link element and replaces its href with the new theme's href.
     * After the new style sheet is loaded, updates the layout service's theme and notifies the listeners.
     */
    changeTheme(theme: string) {
        const themeLink = <HTMLLinkElement>document.getElementById('theme-link')
        if (themeLink) {
            const newHref = themeLink.getAttribute('href')!.replace(this.layoutService.config.theme, theme)
            this.replaceThemeLink(newHref, () => {
                this.layoutService.config.theme = theme
                this.layoutService.onConfigUpdate()
            })
        }
    }

    private markInvalidControlsTouched(group: FormGroup | FormArray): void {
        Object.values(group.controls).forEach(control => {
            if (control instanceof FormGroup || control instanceof FormArray) {
                this.markInvalidControlsTouched(control)
                return
            }

            // Ensure validators are evaluated
            control.updateValueAndValidity({ onlySelf: true, emitEvent: false })

            if (control.invalid) {
                // Use touched for error visibility (or markAsDirty if your CSS relies on dirty)
                control.markAsTouched({ onlySelf: true })
                // control.markAsDirty({ onlySelf: true }) // <- alternative if needed
            }
        })
    }

    // Don't delete this, its needed from a performance point of view,
    ngOnDestroy(): void {
    }
}
