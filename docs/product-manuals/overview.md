---
id: overview
title: Overview Product Manuals
sidebar_label: Overview Product Manuals
slug: /product-manuals/
---

import { CardView } from 'react-card-with-image'
import 'react-card-with-image/dist/index.css'

used: https://reactjsexample.com/cool-react-card-component-with-image/

export const Cards = () => (
<CardView
items={[
{
id: 1,
header: 'Camunda Cloud',
description:
'dolor sit amet, consectetur adipiscing elit. Sed tempus nunc et tincidunt lobortis. Aliquam placerat, justo sit amet mattis molestie, ipsum nisi congue turpis, in imperdiet nisi nisl sit amet arcu. Donec euismod eu ante quis elementum. Maecenas commodo erat',
image: '../../img/camunda-cloud-on-gradient.png'
},
{
id: 2,
header: 'Zeebe',
description:
'dolor sit amet, consectetur adipiscing elit. Sed tempus nunc et tincidunt lobortis. Aliquam placerat, justo sit amet mattis molestie, ipsum nisi congue turpis, in imperdiet nisi nisl sit amet arcu. Donec euismod eu ante quis elementum. Maecenas commodo erat',
image: '../../img/workflow-engine-on-gradient.png'
},
{
id: 3,
header: 'Operate',
description:
'dolor sit amet, consectetur adipiscing elit. Sed tempus nunc et tincidunt lobortis. Aliquam placerat, justo sit amet mattis molestie, ipsum nisi congue turpis, in imperdiet nisi nisl sit amet arcu. Donec euismod eu ante quis elementum. Maecenas commodo erat',
image: '../../img/cockpit-on-gradient.png'
}
]}
activeColor='#000'
imageHeight='200px'
imageWidth='200px'
/>
)

<Cards></Cards>
