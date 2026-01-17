(function () {
    'use strict';

    kintone.events.on('app.record.index.show', function (event) {
        if (document.getElementById('export-weekly-btn')) return;

        const exportButton = document.createElement('button');
        exportButton.id = 'export-weekly-btn';
        exportButton.innerText = '週次データCSV出力';

        exportButton.onclick = ExportData;

        const headerMenuSpace = kintone.app.getHeaderMenuSpaceElement();
        headerMenuSpace.appendChild(exportButton);

        return event;
    });
})();

function ExportData() {
    const appId = kintone.app.getId();

    const today = new Date();
    const weekAgo = new Date();
    weekAgo.setDate(today.getDate() - 6);

    function formatDate(date) {
        return date.toISOString().split('T')[0];
    }

    const fromDate = formatDate(weekAgo);
    const toDate = formatDate(today);

    // クエリは date フィールドを利用
    const query = `date >= "${fromDate}" and date <= "${toDate}" order by date desc`;

    const params = {
        app: appId,
        query: query,
        fields: ['date', 'todo']
    };

    kintone.api(kintone.api.url('/k/v1/records', true), 'GET', params)
        .then(function (resp) {
            const headers = ['日付', 'ToDo'];

            const csvRows = resp.records.map(record => {
                return [
                    record.date.value,
                    record.todo.value
                ].join(',');
            });

            const csvContent = [headers.join(','), ...csvRows].join('\n');

            // SJISに変換（Excelで文字化けしないように）
            const sjisArray = Encoding.convert(csvContent, {
                to: 'SJIS',
                from: 'UNICODE',
                type: 'array'
            });

            const blob = new Blob([new Uint8Array(sjisArray)], { type: 'text/csv' });

            // ファイル名例: todo_2025-09-16~2025-09-22.csv
            saveAs(blob, `todo_${fromDate}~${toDate}.csv`);
        })
        .catch(function (error) {
            console.error('レコード取得エラー', error);
        });
}