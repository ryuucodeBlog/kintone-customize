(function () {
    'use strict';

    function toggle(record) {
        var type = record.type.value;

        // 一度全て非表示＋値クリア
        kintone.app.record.setFieldShown('tel', false);
        kintone.app.record.setFieldShown('email', false);

        record.tel.value = '';
        record.email.value = '';

        if (type === '電話') {
            kintone.app.record.setFieldShown('tel', true);
        }

        if (type === 'メール') {
            kintone.app.record.setFieldShown('email', true);
        }
    }

    kintone.events.on([
        'app.record.create.show',
        'app.record.edit.show'
    ], function (event) {
        toggle(event.record);
        return event;
    });

    kintone.events.on(
        'app.record.create.change.type',
        function (event) {
            toggle(event.record);
            return event;
        }
    );

})();