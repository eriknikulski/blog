# Beschwerden meiner Generation

Quelltext für [eriknikulski.me/blog](https://eriknikulski.me/blog/). Jekyll, gebaut von GitHub Pages bei jedem Push. Kein Theme; JavaScript nur für die Markierung des aktuellen Abschnitts im Inhaltsverzeichnis.

## Struktur

```
index.md                 Startseite (Einleitung, Methodik)
about.md                 Über das Projekt
_chapters/de/*.md        Kapitel (deutsch), URL = Dateiname, z. B. /climate/
_chapters/en/            später: englische Fassung, URL /en/<name>/
_data/i18n.yml           UI-Texte pro Sprache
_layouts/                default, home, chapter, page
_includes/               head, Inhaltsverzeichnis, Ankerlinks, Datum, Lesezeit, Statistik
assets/css/site.css      das einzige Stylesheet
assets/js/toc.js         markiert den aktuellen Abschnitt im seitlichen Inhaltsverzeichnis
assets/img/<kapitel>/    Grafiken: SVG im Text, PNG als Vorschaubild beim Teilen
```

## Kapitel schreiben

Front Matter eines Kapitels:

```yaml
---
title: Klimawandel
number: 1                 # Reihenfolge und Kapitelnummer
status: published         # published | planned (planned = ausgegraut, nicht verlinkt)
description: "…"          # 1–2 Sätze: Inhaltsverzeichnis + Linkvorschau
key_finding: "…"          # 1 Satz mit Zahl für „Das Wichtigste in Kürze“ (Startseite)
tldr: >-                  # „Kurz gesagt“-Box oben im Kapitel, Markdown erlaubt
  …
image: /assets/img/climate/01-global-temperature.png   # Vorschaubild, PNG/JPG
date: 2026-11-15          # Erstveröffentlichung
last_modified_at: 2026-11-15   # „Stand“
changelog:                # erscheint am Kapitelende
  - date: 2026-11-15
    text: Erste Fassung
---
```

Danach der Text in Markdown, **ohne** H1. Der erste Absatz wird automatisch als Einleitung hervorgehoben. Abschnitte als `## 1.1 …`, Unterabschnitte als `###`. Das Inhaltsverzeichnis entsteht aus den `##`-Überschriften.

Bilder, die allein in einem Absatz stehen, werden automatisch zu einer Abbildung mit Link aufs Original:

```markdown
![Aussagekräftiger Alternativtext]({{ '/assets/img/climate/02-co2.svg' | relative_url }})
```

Neues Kapitel beginnen: in `_chapters/de/politics.md` `status: published` setzen und Text schreiben. Unfertige Kapitel, die noch nicht online sein sollen: `published: false`.

## Startseite

`index.md` wird an der Markierung `<!-- chapters -->` geteilt. Davor steht die Einleitung, danach z. B. die Methodik. Dazwischen erscheinen automatisch „Das Wichtigste in Kürze“ und das Kapitelverzeichnis.

## Besucherstatistik

1. Konto auf [goatcounter.com](https://www.goatcounter.com/) anlegen und einen Code wählen, z. B. `eriknikulski`.
2. In `_config.yml` eintragen: `goatcounter: "eriknikulski"`.
3. Statistiken unter `https://<code>.goatcounter.com`, nur nach Login sichtbar.

Das Skript wird nur im Live-Build eingebunden, nicht in der lokalen Vorschau. Keine Cookies, kein Banner.

## Lokale Vorschau

Braucht Ruby ≥ 3.0 und Bundler (macOS: `brew install ruby`).

```sh
bundle install
bundle exec jekyll serve
# → http://localhost:4000/blog/
```

## Englische Fassung (später)

Kapitel nach `_chapters/en/` legen (gleiche Dateinamen, Front Matter auf Englisch), `en/index.md` mit `layout: home` und `lang: en` sowie `en/about.md` mit `permalink: /en/about/` anlegen. UI-Texte stehen schon in `_data/i18n.yml`.
