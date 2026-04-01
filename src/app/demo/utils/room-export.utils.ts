import { TranslateService } from '@ngx-translate/core';
import { Conference } from '../api/conference';
import { Room } from '../api/room';
import { getRoomTypeOptionById } from './room-type.utils';

export function mapRoomForExport(room: Room, translate: TranslateService): { [key: string]: any } {
    const roomType = getRoomTypeOptionById(room?.room_typeid, translate);
    const conferenceNames = Array.isArray(room?.conferences)
        ? room.conferences
            .map((conference: Conference) => conference?.name || '')
            .filter((name: string) => name.length > 0)
            .join(', ')
        : '';
    const translatedBuilding = room?.building
        ? translate.instant(`BUILDINGS.${String(room.building).toUpperCase()}`)
        : '';
    const spareBeds = room?.spareBeds
        ? translate.instant(`SPAREBEDS.${String(room.spareBeds).toUpperCase()}`)
        : '';

    return {
        'Szobaszám': room?.roomNum ?? '',
        'Szoba kód': room?.roomCode ?? '',
        'Ágyak száma': room?.beds ?? '',
        'Pótágy (Matrac/gyerekágy)': spareBeds,
        'Épület/folyosó': translatedBuilding,
        'Ágy típus': room?.bedType ?? '',
        'Fürdőszoba': room?.bathroom ?? '',
        'Megjegyzés': room?.comment ?? '',
        'Emelet': room?.floor ?? '',
        'Klimatizált': room?.climate ? 'Igen' : 'Nem',
        'Családi szoba': room?.familyRoom ? 'Igen' : 'Nem',
        'Extra férőhely': room?.extraBeds ?? '',
        'Szobatípus': roomType?.label ?? '',
        'Szobatípus leírás': roomType?.description ?? '',
        'Szobatípus státusz': roomType ? 'Megadva' : 'Nincs szobatípus megadva',
        'Konferenciák': conferenceNames,
    };
}
