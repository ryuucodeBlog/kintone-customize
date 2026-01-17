(function(){
    'use strict';

    //一覧画面が表示されたら処理開始
    kintone.events.on('app.record.index.show',function(event){
        var records = event.records;

        //全レコードの行
        var rows = kintone.app.getFieldElements('taskName');

        if(!rows) return event;

        for(var i = 0; i < records.length; i++){
            var record = records[i];
            var status = record['status'].value

            //ステータスが未設定の場合はスキップ
            if(!status) continue;

            if(status == "未完了"){
                var row = rows[i].closest('tr');
                if(row){
                    row.style.backgroundColor = '#f9bdb9';
                }
            }
        }

        return event;
    });
})();