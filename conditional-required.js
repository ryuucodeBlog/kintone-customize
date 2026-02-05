(function () {
    'use strict';

    const FIELD_A = '対応要否';     // ラジオボタン
    const FIELD_B = '対応内容';     // 文字列（複数行）
    const REQUIRED_VALUE = '対応あり';

    kintone.events.on(['app.record.create.submit', 'app.record.edit.submit'],
        function (event) {
            const record = event.record;

            // エラーをクリア
            record[FIELD_B].error = null;

            // 「対応あり」の場合
            if (record[FIELD_A].value === REQUIRED_VALUE) {

                // 未入力チェック
                if (
                    !record[FIELD_B].value ||
                    record[FIELD_B].value.trim() === ''
                ) {
                    record[FIELD_B].error =
                        '対応ありの場合は対応内容を入力してください。';
                    return event; // 保存中断
                }
            }

            return event;
        }
    );
})();
