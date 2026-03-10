---
title: "Quick tip: shortId"
date: 2015-05-27T07:19:06Z
tags:
  - Javascript
categories:
  - Quickies
id: 74
image: ../../assets/images/hero/shortid.jpg
---

Generating id's, no matter the concern, it always comes in handy. Check out this little fella!

<!-- more -->

```javascript
import shortid from 'shortid';
const id = shortid.generate();

console.log(id); // => AcBx2A4
```

Unique, url friendly id's, short and simple :-).

```bash
npm install shortid
```

Github: [github.com/dylang/shortid](https://github.com/dylang/shortid)
