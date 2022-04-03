import fetch from 'node-fetch';
import axios from 'axios';
import iconv from 'iconv-lite';
import cheerio from 'cheerio';



export async function getschedule(year, month) {
    year = year || "";
    month = month || "";

    var id = "Q124751571";
    var pwd = "wes20060929";
    var url = "";

    if (year && month) {
        if ((year.toString().length == 4) && (month.toString().length <= 2)) {
            url = `?F_sPeriodsem=${year}&F_wno=${month}&qType=Class&F_sClass=Y09008@Y38`;
        }
        else {
            return "error!";
        };
    };

    let data = await fetch("http://libauto.mingdao.edu.tw/AACourses/Web/wLogin.php", {
        "headers": {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "zh-TW,zh;q=0.9",
            "upgrade-insecure-requests": "1"
        },
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET"
    }).then(response => {
        var setCookie = Object.getOwnPropertySymbols(response).map(item => response[item])[1].headers.get('set-cookie');
        return setCookie.split(';')[0];
    }).then(cookie => {
        fetch("http://libauto.mingdao.edu.tw/AACourses/Web/wLogin.php", {
            "headers": {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "accept-language": "zh-TW,zh;q=0.9",
                "cache-control": "max-age=0",
                "content-type": "application/x-www-form-urlencoded",
                "upgrade-insecure-requests": "1",
                "cookie": cookie,
                "Referer": "http://libauto.mingdao.edu.tw/AACourses/Web/wLogin.php",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": `sureReg=YES&goURL=qWTT.php&accessWay=ACCOUNT&HTTP_REFERER=&wRole=STD&stdID=${id}&stdPWD=${pwd}&uRFID=&Submit=%BDT%A9w%B5n%A4J`,
            "method": "POST"
        });
        return cookie;
    }).then(async cookie => {
        let data = await axios.request({
            responseType: 'arraybuffer',
            method: "GET",
            url: `http://libauto.mingdao.edu.tw/AACourses/Web/qWTT.php${url}`,
            headers: {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "accept-language": "zh-TW,zh;q=0.9",
                "cache-control": "max-age=0",
                "upgrade-insecure-requests": "1",
                "cookie": cookie
            },
            transformResponse: [data => {
                return iconv.decode(Buffer.from(data), 'big5');
            }]
        }).then(response => {
            const $ = cheerio.load(response.data);
            let location = " > table > tbody > tr:nth-child(2) > td > span > div > div.";
            let data = {
                day1: {
                    1: {
                        classname: `${$(`#F_1_1${location}subj`).html()}`,
                        teacher: `${$(`#F_1_1${location}tea`).html()}`
                    },
                    2: {
                        classname: `${$(`#F_1_2${location}subj`).html()}`,
                        teacher: `${$(`#F_1_2${location}tea`).html()}`
                    },
                    3: {
                        classname: `${$(`#F_1_3${location}subj`).html()}`,
                        teacher: `${$(`#F_1_3${location}tea`).html()}`
                    },
                    4: {
                        classname: `${$(`#F_1_4${location}subj`).html()}`,
                        teacher: `${$(`#F_1_4${location}tea`).html()}`
                    },
                    5: {
                        classname: `${$(`#F_1_5${location}subj`).html()}`,
                        teacher: `${$(`#F_1_5${location}tea`).html()}`
                    },
                    6: {
                        classname: `${$(`#F_1_6${location}subj`).html()}`,
                        teacher: `${$(`#F_1_6${location}tea`).html()}`
                    },
                    7: {
                        classname: `${$(`#F_1_7${location}subj`).html()}`,
                        teacher: `${$(`#F_1_7${location}tea`).html()}`
                    },
                    8: {
                        classname: `${$(`#F_1_8${location}subj`).html()}`,
                        teacher: `${$(`#F_1_8${location}tea`).html()}`
                    }
                },
                day2: {
                    1: {
                        classname: `${$(`#F_2_1${location}subj`).html()}`,
                        teacher: `${$(`#F_2_1${location}tea`).html()}`
                    },
                    2: {
                        classname: `${$(`#F_2_2${location}subj`).html()}`,
                        teacher: `${$(`#F_2_2${location}tea`).html()}`
                    },
                    3: {
                        classname: `${$(`#F_2_3${location}subj`).html()}`,
                        teacher: `${$(`#F_2_3${location}tea`).html()}`
                    },
                    4: {
                        classname: `${$(`#F_2_4${location}subj`).html()}`,
                        teacher: `${$(`#F_2_4${location}tea`).html()}`
                    },
                    5: {
                        classname: `${$(`#F_2_5${location}subj`).html()}`,
                        teacher: `${$(`#F_2_5${location}tea`).html()}`
                    },
                    6: {
                        classname: `${$(`#F_2_6${location}subj`).html()}`,
                        teacher: `${$(`#F_2_6${location}tea`).html()}`
                    },
                    7: {
                        classname: `${$(`#F_2_7${location}subj`).html()}`,
                        teacher: `${$(`#F_2_7${location}tea`).html()}`
                    },
                    8: {
                        classname: `${$(`#F_2_8${location}subj`).html()}`,
                        teacher: `${$(`#F_2_8${location}tea`).html()}`
                    }
                },
                day3: {
                    1: {
                        classname: `${$(`#F_3_1${location}subj`).html()}`,
                        teacher: `${$(`#F_3_1${location}tea`).html()}`
                    },
                    2: {
                        classname: `${$(`#F_3_2${location}subj`).html()}`,
                        teacher: `${$(`#F_3_2${location}tea`).html()}`
                    },
                    3: {
                        classname: `${$(`#F_3_3${location}subj`).html()}`,
                        teacher: `${$(`#F_3_3${location}tea`).html()}`
                    },
                    4: {
                        classname: `${$(`#F_3_4${location}subj`).html()}`,
                        teacher: `${$(`#F_3_4${location}tea`).html()}`
                    },
                    5: {
                        classname: `${$(`#F_3_5${location}subj`).html()}`,
                        teacher: `${$(`#F_3_5${location}tea`).html()}`
                    },
                    6: {
                        classname: `${$(`#F_3_6${location}subj`).html()}`,
                        teacher: `${$(`#F_3_6${location}tea`).html()}`
                    },
                    7: {
                        classname: `${$(`#F_3_7${location}subj`).html()}`,
                        teacher: `${$(`#F_3_7${location}tea`).html()}`
                    },
                    8: {
                        classname: `${$(`#F_3_8${location}subj`).html()}`,
                        teacher: `${$(`#F_3_8${location}tea`).html()}`
                    }
                },
                day4: {
                    1: {
                        classname: `${$(`#F_4_1${location}subj`).html()}`,
                        teacher: `${$(`#F_4_1${location}tea`).html()}`
                    },
                    2: {
                        classname: `${$(`#F_4_2${location}subj`).html()}`,
                        teacher: `${$(`#F_4_2${location}tea`).html()}`
                    },
                    3: {
                        classname: `${$(`#F_4_3${location}subj`).html()}`,
                        teacher: `${$(`#F_4_3${location}tea`).html()}`
                    },
                    4: {
                        classname: `${$(`#F_4_4${location}subj`).html()}`,
                        teacher: `${$(`#F_4_4${location}tea`).html()}`
                    },
                    5: {
                        classname: `${$(`#F_4_5${location}subj`).html()}`,
                        teacher: `${$(`#F_4_5${location}tea`).html()}`
                    },
                    6: {
                        classname: `${$(`#F_4_6${location}subj`).html()}`,
                        teacher: `${$(`#F_4_6${location}tea`).html()}`
                    },
                    7: {
                        classname: `${$(`#F_4_7${location}subj`).html()}`,
                        teacher: `${$(`#F_4_7${location}tea`).html()}`
                    },
                    8: {
                        classname: `${$(`#F_4_8${location}subj`).html()}`,
                        teacher: `${$(`#F_4_8${location}tea`).html()}`
                    }
                },
                day5: {
                    1: {
                        classname: `${$(`#F_5_1${location}subj`).html()}`,
                        teacher: `${$(`#F_5_1${location}tea`).html()}`
                    },
                    2: {
                        classname: `${$(`#F_5_2${location}subj`).html()}`,
                        teacher: `${$(`#F_5_2${location}tea`).html()}`
                    },
                    3: {
                        classname: `${$(`#F_5_3${location}subj`).html()}`,
                        teacher: `${$(`#F_5_3${location}tea`).html()}`
                    },
                    4: {
                        classname: `${$(`#F_5_4${location}subj`).html()}`,
                        teacher: `${$(`#F_5_4${location}tea`).html()}`
                    },
                    5: {
                        classname: `${$(`#F_5_5${location}subj`).html()}`,
                        teacher: `${$(`#F_5_5${location}tea`).html()}`
                    },
                    6: {
                        classname: `${$(`#F_5_6${location}subj`).html()}`,
                        teacher: `${$(`#F_5_6${location}tea`).html()}`
                    },
                    7: {
                        classname: `${$(`#F_5_7${location}subj`).html()}`,
                        teacher: `${$(`#F_5_7${location}tea`).html()}`
                    },
                    8: {
                        classname: `${$(`#F_5_8${location}subj`).html()}`,
                        teacher: `${$(`#F_5_8${location}tea`).html()}`
                    }
                },
                day6: {
                    1: {
                        classname: `${$(`#F_6_1${location}subj`).html()}`,
                        teacher: `${$(`#F_6_1${location}tea`).html()}`
                    },
                    2: {
                        classname: `${$(`#F_6_2${location}subj`).html()}`,
                        teacher: `${$(`#F_6_2${location}tea`).html()}`
                    },
                    3: {
                        classname: `${$(`#F_6_3${location}subj`).html()}`,
                        teacher: `${$(`#F_6_3${location}tea`).html()}`
                    },
                    4: {
                        classname: `${$(`#F_6_4${location}subj`).html()}`,
                        teacher: `${$(`#F_6_4${location}tea`).html()}`
                    },
                    5: {
                        classname: `${$(`#F_6_5${location}subj`).html()}`,
                        teacher: `${$(`#F_6_5${location}tea`).html()}`
                    },
                    6: {
                        classname: `${$(`#F_6_6${location}subj`).html()}`,
                        teacher: `${$(`#F_6_6${location}tea`).html()}`
                    },
                    7: {
                        classname: `${$(`#F_6_7${location}subj`).html()}`,
                        teacher: `${$(`#F_6_7${location}tea`).html()}`
                    },
                    8: {
                        classname: `${$(`#F_6_8${location}subj`).html()}`,
                        teacher: `${$(`#F_6_8${location}tea`).html()}`
                    }
                },
            };
            return data;
        }).catch(error => {
            console.error(error);
        });
        return data;
    });
    return data;
}