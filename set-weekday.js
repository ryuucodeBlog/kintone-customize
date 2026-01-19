    (function () {
    'use strict';

    //設定
    const DATE_FIELD = 'date';       // 日付フィールドコード
    const WEEKDAY_FIELD = 'weekday'; // 曜日フィールドコード

    const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'];

    function setWeekday(record) {
    const dateValue = record[DATE_FIELD].value;

    if (!dateValue) {
        record[WEEKDAY_FIELD].value = '';
        return;
    }

    const date = new Date(dateValue);
    record[WEEKDAY_FIELD].value = WEEKDAYS[date.getDay()];
    }

    kintone.events.on(
    [
        `app.record.create.change.${DATE_FIELD}`,
        `app.record.edit.change.${DATE_FIELD}`
    ],
    function (event) {
        setWeekday(event.record);
        return event;
    }
    );

    })();
