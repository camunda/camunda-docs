{% for group in groups.values() %}

### {{ group.label }}

{{ group.description }}

{% if group.hooks.before %}{{ group.hooks.before }}{% endif %}

{% for property_group, properties in group.property_groups.items() %}
{% if property_group != "general" %}#### {{ property_group|title }}{% endif %}

| Property                         | Type                 | Required            | Description             | Binding                    |
| :------------------------------- | :------------------- | :------------------ | :---------------------- | :------------------------- | ------------------------ |
| {% for property in properties %} | {{ property.label }} | {{ property.type }} | {{ property.required }} | {{ property.description }} | `{{ property.binding }}` |

{% endfor %}

{% endfor %}

{% if group.hooks.after %}{{ group.hooks.after }}{% endif %}

{%- endfor %}
