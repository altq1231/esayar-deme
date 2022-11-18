// 请从开者中心获取 "Client-end (Target Recognition) URL"，
// 格式如：https://af0c1ca3b........0601c74.cn1.crs.easyar.com:8443
const app = new App('https://c8826b5e495280843de15e1a126546dd.cn1.crs.easyar.com:8443');
// 如果使用自定义方法获取token
app.setToken({
    'crsAppId': 'b5c729f7a1cfeb7911a0199523652d5b',
    'token': 'loKOHd75wZSCHIJOxb5wzUa+1LEfSguNgzthtGCixU7qaC1wUfK4qDPG3nPkVza91MYSlI0owWNCAHAhqWQJhQ7vu9kciIoa0+lEOciOLIQUo7LtQm0LavOVe9FkICn4KiJAfPHwOGeXpDDJ8lHrZUxH0Ogqaq6ffs7meeCgdOlYBIdDK3KX9r8kN7eG8hxsgVegCqV6H8Cl2eglNx3Y5OcIihg9hxDE7I3pF+0J/7KxVthrAPkSFZWzAifwnvJI5mvT6J8/J695sXVk40arnhssmifQ+4+Wjmxu5MZoH1nfykbawPVeiGVpGuXzDDg/oLWqz3pzPd2gyO1MYSjC3pVtUi0M+bLKrkQcuw4sohGOqPc5XpoAVG6Uvx5qA38iSPUbSLZaeT55NpBMDbs780DRmwYbkfo8AQVcqLLBs094MS3I2bFeOeb3VSxbne9O6o9MHfJpYUj09PCr58ZK/0Bbq78b+3oCuhLstIHoOkHJIjRngcOQtoWMStQ3DkVcYK6XwnqAz/i4jtUWrg1FOndEcu+3IGBciYY8nMnS3jdZ4UVcQXi23wZcrv5fkVk4FZ5SCM534SyvygMoqWZelP9Q0RFgO80FRUWnLVQGH2xT9rJ8sXXIO41tf4C7UySw' // APIKey+APISecret生成的token
});
// 如果使用EasyAR提供的集成环境
// app.useEasyAr();
// 识别成功后的回调
app.callback = (msg) => {
    console.info(msg);
    const setting = {
        model: 'asset/model/trex_v3.fbx',
        scale: 0.02,
        position: [0, 0, 0]
    };
    // 可以将 setting 作为meta上传到EasyAR的云识别，使用方法如下:
    // const setting = JSON.parse(window.atob(msg.target.meta));
    showModel(setting);
};

function showModel(setting) {
    const canvas = document.querySelector('.easyARCanvas');
    if (canvas) {
        canvas.remove();
    }
    app.show('loadingWrap');
    // ThreeJS简单使用类
    const threeHelper = new ThreeHelper();
    threeHelper.loadObject(setting, (p) => {
        const val = Math.ceil(p.loaded / p.total * 100);
        document.querySelector('#loadingPercent').innerHTML = `${val}%`;
        if (val >= 100) {
            app.hide('loadingWrap');
        }
    });
}