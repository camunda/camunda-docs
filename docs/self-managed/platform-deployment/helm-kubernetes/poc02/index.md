---
id: index
title: "[POC02] link + index file + embedded generated sub items"
description: "poc"
---

import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

body

embedded generated sub items

<DocCardList items={useCurrentSidebarCategory().items}/>
