# Gallery Section Layout Reference

## Grid Structure
- **CSS**: 3-column grid (`grid-template-columns: repeat(3, 1fr)`), 16px gap
- **Responsive**: Collapses to 2-column at smaller breakpoints

## Slots (6 total)

```
+-------------------------------+---------------+
|                               |               |
|   SLOT 1 (wide — span 2)     |    SLOT 2     |
|   "Summer Sessions 2025"     |  "Frequency   |
|   aspect-ratio: 2/1          |    Miami"     |
|   --hue: 330                 |  aspect: 1/1  |
|                               |  --hue: 25    |
+---------------+---------------+---------------+
|               |               |               |
|    SLOT 3     |    SLOT 4     |   SLOT 5      |
|  "Afterglow   |  "Deep        |   (wide —     |
|    NYE"       |   Currents"   |   span 2)     |
|  aspect: 1/1  |  aspect: 1/1  |  "BTR Opening |
|  --hue: 270   |  --hue: 200   |    Night"     |
|               |               |  aspect: 2/1  |
|               |               |  --hue: 45    |
+---------------+---------------+---------------+
```

## Slot Details

| Slot | Class                        | Label                 | Aspect Ratio | Hue  |
|------|------------------------------|-----------------------|--------------|------|
| 1    | `gallery__item--wide`        | Summer Sessions 2025  | 2:1          | 330  |
| 2    | `gallery__item`              | Frequency Miami       | 1:1          | 25   |
| 3    | `gallery__item`              | Afterglow NYE         | 1:1          | 270  |
| 4    | `gallery__item`              | Deep Currents         | 1:1          | 200  |
| 5    | `gallery__item--wide`        | BTR Opening Night     | 2:1          | 45   |

## Notes
- Wide slots span 2 columns (landscape orientation, 2:1 aspect)
- Standard slots are square (1:1 aspect)
- Each slot currently has an SVG placeholder icon — replace with `<img>` tags
- The `--hue` CSS variable controls placeholder background color (can be removed when photos are added)
- Overlay text (`gallery__overlay > span`) shows the label on hover
