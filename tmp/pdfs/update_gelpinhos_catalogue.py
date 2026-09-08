from pathlib import Path

import fitz


source = Path('apps/web/public/brand/Catalogo-Gelpinhos.pdf')
logo = Path('apps/web/public/brand/gelpinhos.png')
output = Path('tmp/pdfs/Catalogo-Gelpinhos-atualizado.pdf')

document = fitz.open(source)

for page_index in (0, 2):
    page = document[page_index]

    # Remove the previous brand, slogan, and product-family heading only.
    page.draw_rect(fitz.Rect(0, 0, page.rect.width, 67), color=None, fill=(1, 1, 1), overlay=True)

    # Reintroduce the Gelpinhos mark with enough contrast for the white source logo.
    brand_panel = fitz.Rect(42, 13, 174, 58)
    page.draw_rect(brand_panel, color=None, fill=(0.04, 0.46, 0.43), overlay=True)
    page.insert_image(fitz.Rect(54, 19, 163, 52), filename=str(logo), keep_proportion=True, overlay=True)

document.save(output, garbage=4, deflate=True)
document.close()
