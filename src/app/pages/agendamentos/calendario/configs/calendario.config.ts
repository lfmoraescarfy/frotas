import { CalendarOptions } from "@fullcalendar/core";
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import ptLocale from '@fullcalendar/core/locales/pt-br';
import momentTimezonePlugin from '@fullcalendar/moment-timezone'

export function CALENDARIO_CONFIG(): CalendarOptions{
    return {
        plugins: [
          interactionPlugin,
          dayGridPlugin,
          timeGridPlugin,
          listPlugin,
          momentTimezonePlugin
        ],
        headerToolbar: {
          right: 'dayGridMonth,dayGridWeek,dayGridDay,listWeek',
          center: 'title',
          left: 'prev,next today'
        },
        defaultAllDay: false,
        locale: ptLocale,
        initialView: "dayGridMonth",
        themeSystem: "bootstrap",
        weekends: false,
        editable: false,
        selectable: true,
        selectMirror: true,
        longPressDelay: 700,
        timeZone: 'America/Sao_Paulo',
    };
}