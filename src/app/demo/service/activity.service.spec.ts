import { ActivityService } from './activity.service';

describe('ActivityService', () => {
    let service: ActivityService;

    beforeEach(() => {
        service = new ActivityService();
    });

    it('creates the service', () => {
        expect(service).toBeTruthy();
    });

    it('returns the seeded activities in order', () => {
        const activityNames = service.getActivities().map((activity) => activity.activityName);

        expect(activityNames).toEqual([
            'Bejelentkezés',
            'Szoba hozzárendelés',
            'Jelentkezés elutasítás',
            'Konyhanaptár megtekintése',
            'Takaró hozzáadása'
        ]);
    });

    it('appends a new activity to the end of the list', () => {
        const initialLength = service.getActivities().length;
        const newActivity = {
            activityName: 'Új tevékenység',
            userName: 'User',
            timestamp: new Date()
        };

        service.addActivity(newActivity);

        const updatedActivities = service.getActivities();

        expect(updatedActivities.length).toBe(initialLength + 1);
        expect(updatedActivities.at(-1)).toBe(newActivity);
    });
});
