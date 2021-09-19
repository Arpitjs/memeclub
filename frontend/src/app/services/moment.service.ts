import { Injectable } from "@angular/core";
import * as moment from 'moment'
@Injectable()

export class MomentService {
    timeFromNow(time) {
        return moment(time).fromNow()
    }
    messageDate(date) {
        return moment(date).calendar(null, {
            sameDay: '[Today]',
            lastDay: '[Yesterday]',
            lastWeek: 'DD/MM/YYYY',
            sameElse: 'DD/MM/YYYY'
        })
    }
}