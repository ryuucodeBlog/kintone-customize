(function () {
    'use strict';

    kintone.events.on(['app.record.create.show', 'app.record.edit.show', 'app.record.index.edit.show'], function (event) {
        const record = event.record;
        const user = kintone.getLoginUser();

        // ユーザー選択フィールド（フィールドコード：user）にログインユーザーをセット
        record['user'].value = [{
            code: user.code,
            name: user.name
        }];

        return event;
    });
})();