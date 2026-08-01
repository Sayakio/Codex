---
Status: false
Field: 
Year: {% if date %}{{date | format("YYYY")}}{% endif %}
{% if DOI %}DOI: {{DOI}}{% endif %}
Tags: [{% for t in tags %}{{ t.tag | replace(" ", "-") }}, {% endfor %}]
Authors: {% for t in creators %}{{t.firstName}}{{t.lastName}}{{t.name}}{% if not loop.last %}, {% endif %}{% endfor %}
{% if journalAbbreviation %}Journal: {{journalAbbreviation}}{% endif %}
Type: {{itemType}} {{thesisType}}
{% if publicationTitle %}Publication: {{publicationTitle}} {{university}}{% endif %}
Citekey: {{citekey}}
---

# {{title}}

## ABSTRACT
{{abstractNote}}

## FILES & LINKS
- **URL:**  [Open Online]({{url}})
- **Zotero Entry:** {{pdfZoteroLink}}


## 1. PROBLEMS



## 2. METHOD



## 3. EXPERIMENTS



## 4. THINKING

