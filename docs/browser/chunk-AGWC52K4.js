import{g as d}from"./chunk-MCIFKHT2.js";import"./chunk-N6SYSOPC.js";import"./chunk-GLX7FACF.js";import{$b as e,Ab as t,Bb as n,Cb as u,Ka as p,Q as a,ab as c,bb as r,ud as h}from"./chunk-3NAOPKLA.js";import"./chunk-INBISJ52.js";var l=class i{static{this.\u0275fac=function(o){return new(o||i)}}static{this.\u0275cmp=c({type:i,selectors:[["ng-component"]],standalone:!1,decls:152,vars:0,consts:[[1,"card"],[1,"app-code"],[1,"font-semibold"],[1,"text-primary","font-medium"],[1,"video-container"],["width","560","height","315","src",p`https://www.youtube.com/embed/yl2f8KKY204`,"frameborder","0","allowfullscreen",""],[1,"line-height-4"],[1,"text-sm"],["href","https://www.youtube.com/watch?v=5VOuUdDXRsE",1,"font-medium","text-primary","hover:underline"],["href","https://www.primefaces.org/designer/primeng"],["href","https://www.primefaces.org/designer/api/primeng/15.0.0/",1,"font-medium","text-primary","hover:underline"]],template:function(o,y){o&1&&(t(0,"div",0)(1,"h2"),e(2,"Documentation"),n(),t(3,"h4"),e(4,"Getting Started"),n(),t(5,"p"),e(6,"Apollo is an application template for Angular and is distributed as a CLI project. Current versions is Angular v16 with PrimeNG v16. In case CLI is not installed already, use the command below to set it up."),n(),t(7,"pre",1)(8,"code"),e(9,"npm install -g @angular/cli"),n()(),t(10,"p"),e(11,'Once CLI is ready in your system, extract the contents of the zip file distribution, cd to the directory, install the libraries from npm and then execute "ng serve" to run the application in your local environment.'),n(),t(12,"pre",1)(13,"code"),e(14,`cd apollo
npm install
ng serve`),n()(),t(15,"p"),e(16,"The application should run at "),t(17,"span",2),e(18,"http://localhost:4200/"),n(),e(19,", you may now start with the development of your application."),n(),t(20,"h5"),e(21,"Important CLI Commands"),n(),t(22,"p"),e(23,"Following commands are derived from CLI."),n(),t(24,"pre",1)(25,"code"),e(26,`Run 'ng serve' for a dev server. Navigate to \`http://localhost:4200/\`. The app will automatically reload if you change any of the source files.

Run 'ng generate component component-name' to generate a new component. You can also use \`ng generate directive/pipe/service/class/module\`.

Run 'ng build' to build the project. The build artifacts will be stored in the \`dist/\` directory. Use the \`-prod\` flag for a production build.

Run 'ng test' to execute the unit tests via [Karma](https://karma-runner.github.io).

Run 'ng e2e' to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

Run 'ng help' for more options.`),n()(),t(27,"h4"),e(28,"Structure"),n(),t(29,"p"),e(30,"Apollo consists of 3 main parts; the application layout, layout assets and PrimeNG component theme assets. Layout is placed inside the "),t(31,"span",3),e(32,"src/app/layout"),n(),e(33," folder, and the assets are in the "),t(34,"span",3),e(35,"src/assets/layout"),n(),e(36," folder. "),n(),t(37,"h5"),e(38,"Default Configuration"),n(),t(39,"p"),e(40,"Initial layout configuration can be defined at the main app component by injecting the "),t(41,"span",3),e(42,"LayoutService"),n(),e(43,", this step is optional and only necessary when customizing the defaults. Note that "),t(44,"span",3),e(45,"theme"),n(),e(46," and "),t(47,"span",3),e(48,"scale"),n(),e(49," are not reactive since theme is configured outside of Angular at "),t(50,"strong",2),e(51,"index.html"),n(),e(52," by default and initial scale is defined with the "),t(53,"span",3),e(54,"$scale"),n(),e(55," at "),t(56,"strong",2),e(57,"layout.scss"),n(),e(58,". When default theme or scale is changed at their files initially, it is required to configure the layout service with the matching values to avoid sync issues. "),n(),t(59,"pre",1)(60,"code"),e(61,`import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { LayoutService } from './layout/service/app.layout.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private primengConfig: PrimeNGConfig, private layoutService: LayoutService) { }

    ngOnInit(): void {
        this.primengConfig.ripple = true;       //enables core ripple functionality

        //optional configuration with the default configuration
        this.layoutService.config = {
            ripple: false,                      //toggles ripple on and off
            inputStyle: 'outlined',             //default style for input elements
            menuMode: 'static',                 //layout mode of the menu, valid values are "static", "overlay", "slim", "horizontal", "reveal" and "drawer" 
            colorScheme: 'light',               //color scheme of the template, valid values are "light", "dim" and "dark"
            theme: 'indigo',                    //default component theme for PrimeNG
            menuTheme: "colorScheme",           //theme of the menu, valid values are "colorScheme", "primaryColor" and "transparent"
            scale: 14                           //size of the body font size to scale the whole application
        };
    }

}`),n()(),t(62,"h5"),e(63,"Menu"),n(),t(64,"p"),e(65,"Menu is a separate component defined in "),t(66,"span",3),e(67,"src/app/layout/app.menu.component.ts"),n(),e(68," file and based on PrimeNG MenuModel API. In order to define the menuitems, navigate to this file and define your own model as a nested structure."),n(),t(69,"pre",1)(70,"code"),e(71,`import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[];

    ngOnInit() {
        this.model = [
            {
                label: 'Dashboards',
                icon: 'pi pi-home',
                items: [
                    {
                        label: 'E-Commerce',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/']
                    },
                    {
                        label: 'Banking',
                        icon: 'pi pi-fw pi-image',
                        routerLink: ['/apollo/dashboard-banking']
                    }
                ]
            },
            //...
        ];
    }
}`),n()(),t(72,"h5"),e(73,"Breadcrumb"),n(),t(74,"p"),e(75,"Breadcrumb component at the topbar section is dynamic and retrieves the path information from the router using the "),t(76,"span",3),e(77,"data.breadcrumb"),n(),e(78," property."),n(),t(79,"pre",1)(80,"code"),e(81,"{ path: 'documentation', data: { breadcrumb: 'Documentation' }, loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) }"),n()(),t(82,"h4"),e(83,"Integration with Existing Angular CLI Projects"),n(),t(84,"p"),e(85,"Apollo structure is designed in a modular way so that it can easily be integrated with your existing application. We've created a short tutorial with details."),n(),t(86,"div",4),u(87,"iframe",5),n(),t(88,"h4"),e(89,"Theme"),n(),t(90,"p"),e(91,"Apollo provides 24 PrimeNG themes out of the box. Setup of a theme is simple by including the css of theme to your bundle that are located inside "),t(92,"span",3),e(93,"assets/layout/styles/theme/"),n(),e(94," folder such as "),t(95,"span",3),e(96,"assets/layout/styles/theme/theme-light/blue/theme.css"),n(),e(97,"."),n(),t(98,"p"),e(99,"A custom theme can be developed by the following steps."),n(),t(100,"ul")(101,"li",6),e(102,'Choose a custom theme name such as "mytheme".'),n(),t(103,"li",6),e(104,'Create a folder named "mytheme" under '),t(105,"span",2),e(106,"assets/layouts/styles/theme-light/"),n(),e(107," folder."),n(),t(108,"li",6),e(109,'Create a file such as theme.scss inside your "mytheme" folder.'),n(),t(110,"li",6),e(111,"Define the variables listed below in your file and import the dependencies."),n(),t(112,"li",6),e(113,"Include the theme.scss to your application."),n()(),t(114,"p"),e(115,"Here are the variables required to create a theme."),n(),t(116,"pre",1)(117,"code"),e(118,`$primaryColor: #3B82F6 !default;
$primaryLightColor: #BFDBFE !default;
$primaryDarkColor: #2563eb !default;
$primaryDarkerColor: #1D4ED8 !default;
$primaryTextColor: #ffffff !default;
$primary500:#3B82F6 !default;

$highlightBg: #EFF6FF !default;
$highlightTextColor: $primaryDarkerColor !default;

@import '../_variables';
@import '../../theme-base/_components';
@import '../_extensions';`),n()(),t(119,"h5"),e(120,"Theme Switcher"),n(),t(121,"p"),e(122,"Dynamic theming is built-in to the template and implemented by including the theme via a link tag instead of bundling the theme along with a configurator component to switch it. In order to switch your theme dynamically as well, it needs to be compiled to css. An example sass command to compile the css would be; "),n(),t(123,"pre",1)(124,"code"),e(125,"sass --update src/assets/theme/mytheme/theme.scss:src/assets/theme/mytheme/theme.css"),n()(),t(126,"p",7),e(127,"*Note: The sass command above is supported by Dart Sass. Please use Dart Sass instead of Ruby Sass."),n(),t(128,"p"),e(129,"Another alternative would be creating dynamic bundles, please see the "),t(130,"a",8),e(131,"video tutorial"),n(),e(132," for an example."),n(),t(133,"h5"),e(134,"Theme Designer"),n(),t(135,"p"),e(136,"Apollo includes a simplified version of the "),t(137,"a",9),e(138,"PrimeNG Theme Designer"),n(),e(139," that only includes the main SASS structure. Full list of SASS variables to customize the components further is available at the "),t(140,"a",10),e(141,"SASS API"),n(),e(142," docs. "),n(),t(143,"h4"),e(144,"Migration Guide"),n(),t(145,"p"),e(146,"Every important change is included in "),t(147,"b"),e(148,"CHANGELOG.md"),n(),e(149," file at the root folder of the distribution along with the instructions to update. Whenever a major version of Angular is released, a new version of the template is provided that mainly brings compatibility support to the PrimeNG component theming. If there are no compatibility issues on component theming e.g. new components or new functionality to PrimeNG, you may still update your application to the latest Angular and PrimeNG without the need to waiting for an update."),n(),t(150,"p"),e(151,'Initial integration with an existing CLI application and the update process is similar. During an update, only the layout folder and layout assets folder need to be updated and overriden, see the "Integration with Existing Angular CLI Projects" section for more information.'),n()())},styles:["@media screen and (max-width:991px){.video-container[_ngcontent-%COMP%]{position:relative;width:100%;height:0;padding-bottom:56.25%}.video-container[_ngcontent-%COMP%]   iframe[_ngcontent-%COMP%]{position:absolute;top:0;left:0;width:100%;height:100%}}"]})}};var m=class i{static{this.\u0275fac=function(o){return new(o||i)}}static{this.\u0275mod=r({type:i})}static{this.\u0275inj=a({imports:[d.forChild([{path:"",component:l}]),d]})}};var g=class i{static{this.\u0275fac=function(o){return new(o||i)}}static{this.\u0275mod=r({type:i})}static{this.\u0275inj=a({imports:[h,m]})}};export{g as DocumentationModule};
