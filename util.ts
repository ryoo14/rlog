const header = `---
title: 
publish_date: _PUBLISH_DATE`

const blog = `
tags: [blog]
---

`

const content = `
tags: [monthly_contents]
---

## アニメ

[]()

## 漫画

[]()

## 映画

[]()

## 書籍・小説

[]()

## ゲーム

[]()

## 学習・自己啓発

[]()
`

export const blogEntry = header + blog;
export const contentEntry = header + content;

export function convertDateToString(date: Date) {
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const dateString = year + '-' + month + '-' + day;
    return dateString;
}

export function createEntryFile(entry: string, filename: string) {
  Deno.writeTextFileSync(`./posts/${filename}.md`, entry);
}
