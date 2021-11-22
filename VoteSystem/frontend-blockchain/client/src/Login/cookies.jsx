import React, {useState, useEffect} from 'react';
import * as Cookies from "js-cookie";

export function setSessionCookie(key, value, expire) {
    Cookies.set(key,value);
    console.log(key+":"+value);
    return;
}

export function removeSessionCookie() {
    Cookies.remove('id');
    Cookies.remove('type');
}

export default function getSessionCookie(key) {
    const sessionCookie = Cookies.get(key);

    if (sessionCookie===undefined) {
        console.log("Cookie undefined")
        return null;
    } else {
        console.log("sessionCookie : " + sessionCookie);
        return sessionCookie;
    }
}

export function isLogin(type) {
    const sessionCookie = Cookies.get('id');
    const loginType = Cookies.get('type');

    if (sessionCookie===undefined) {
        console.log("Cookie undefined")
        alert("로그인이 필요합니다.")
        document.location.href='/';
        return null;
    }
    if (type != loginType) {
        if (type==="Admin") {
            alert("관리자 권한이 필요합니다.");
            document.location.href='/loginAdmin';
        }
        else if (type==="Voter") {
            alert("투표자 권한이 필요합니다.");
            document.location.href='/loginVoter';
        }
    }
}