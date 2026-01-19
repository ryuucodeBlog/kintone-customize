(function () {
    'use strict';

    //設定
    const WEEKDAY_FIELD_CODE = 'weekday'; // 曜日フィールドのフィールドコード

    //共通：色付け処理
    function applyColor(element, value) {
        if (!element) return;

        if (value === '土') {
            element.style.color = 'blue';
        } else if (value === '日') {
            element.style.color = 'red';
        }
    }

    //一覧画面
    kintone.events.on('app.record.index.show', function (event) {
        event.records.forEach(function (record, index) {
            const value = record[WEEKDAY_FIELD_CODE].value;
            const cell = kintone.app.getFieldElements(WEEKDAY_FIELD_CODE)[index];
            applyColor(cell, value);
        });
        return event;
    });

    //レコード詳細画面
    kintone.events.on('app.record.detail.show', function (event) {
        const value = event.record[WEEKDAY_FIELD_CODE].value;
        const element = kintone.app.record.getFieldElement(WEEKDAY_FIELD_CODE);
        applyColor(element, value);
        return event;
    });

})();
