(function() {
    'use strict';

    kintone.events.on(['app.record.create.change.zipcode', 'app.record.edit.change.zipcode'], function(event) {
        var record = event.record;
        var zipcode = record.zipcode.value;

        //郵便番号の値がない場合は処理を抜け出す
        if(!zipcode) return;

        //数字以外を削除、７桁以外の場合は処理を抜け出す
        zipcode = zipcode.replace(/\D/g, '');
        if(zipcode.length !== 7) return zipcode;

        //３桁-４桁になるように整形する
        zipcode = zipcode.replace(/^(\d{3})(\d{4})$/, '$1-$2');

        $.ajax({
            // 郵便番号から住所を取得するAPIにリクエスト
            url: 'https://api.zipaddress.net/?zipcode=' + zipcode,
            dataType: 'json',  // 返ってくるデータ形式はJSON
            async: false,      // 同期処理で実行

            success: function(response) {
                // 住所が見つかればフォームにセット
                if(response.code === 200 && response.data) {
                    record.zipcode.value = zipcode;
                    record.address.value = response.data.fullAddress;
                } else {
                    alert('該当する住所が見つかりませんでした');
                    record.zipcode.value = null;
                    record.address.value = null;
                }
            },
            error: function(response) { 
                // 通信エラー時の処理
                alert('郵便番号から住所の検索に失敗しました');
                record.zipcode.value = null;
            }
        });
        return event
    });
})();