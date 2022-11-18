// 请从开者中心获取 "Client-end (Target Recognition) URL"，
// 格式如：https://af0c1ca3b........0601c74.cn1.crs.easyar.com:8443
const app = new App('https://c8826b5e495280843de15e1a126546dd.cn1.crs.easyar.com:8443');
// 如果使用自定义方法获取token
app.setToken({
    'crsAppId': '5ac417c4d19b5c839561419a47df0ab2',
    'token': 'nj6TPnm/SHnNSZZ/hRxgTuiv1boxZtrwZqIsStO4spOwuWAahbw9jB+NBFfYVPVYPU3r87JMXV4LYi7DLyRViVQASVg5zWfcRuZ7gWh3pf0V1FlT5qhsrrB0d69spi+VpyljBF/RI8aHIsEZzOxIOQgk2OvBnRnwxrmYuB6pSPKkGq63e62DE2s+20j5ig+XzT3TTRIQRijLmKNh6j6tbnip8ZApVhbRIISFIlNS/A/C5E5cqDjo4Czu4IsXKrkZqRwKnp+eEDgW5t4TnC4w3ENRHoRStgcSk+8iSuBkYqOxWGQLW/8sydvHDfFLbpALzWPRJCipT9PlejgA92VLJB3/U27YIqz38bvtTLTn2y05cNvD+ONXVUH/k6+f/5PobE9DViNI38J6y3Rw/bFDcpqKXpg7WAcJy0BLH/KL3MFLZymT1L85NdJwfdc38PKexCxZxf4Kipt8o4637jhwHu+0u+lqVaGEQhM8nNd+EsSp3IxKRh00jrEOhW/QoGLf37wU/+vb9ySwxU7hmevIynqLBu4kLIPIQt0PUaf9wLOQdI6pssLBWWCpbUmZMJblWaBfpkgckLMJVt7roZ6Ps6VGgoUeqyKQthtUa+Ifht3MZBGj/672mt0zutvoMrKy' // APIKey+APISecret生成的token
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