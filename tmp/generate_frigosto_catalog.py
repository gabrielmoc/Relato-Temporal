from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas


ROOT = Path('/Users/gabrielmoc/Downloads/Relato Temporal/apps/web/public/brand')
OUTPUT = ROOT / 'Catalogo-Frigosto.pdf'
PAGE_WIDTH, PAGE_HEIGHT = landscape(A4)

INK = HexColor('#08202a')
BLUE = HexColor('#15546d')
AQUA = HexColor('#35bdd0')
PAPER = HexColor('#f4f7f5')
MUTED = HexColor('#567177')
LINE = HexColor('#cadbd8')

GROUPS = [
    ('Forno e Air Fryer', [
        ('Bolinho com Bacalhau', 'bolinho-com-bacalhau.jpg', 'Produto ultracongelado, com a forma tradicional, formado por uma mistura homogenea a base de bacalhau.', '40 g ou 60 g'),
        ('Empadas com Bacalhau', 'empadas-com-bacalhau.jpg', 'Produto ultracongelado produzido manualmente, com formato tradicional, constituido com recheio a base de bacalhau.', '55 g ou 85 g'),
        ('Rissois com Cogumelos Shitake', 'rissois-com-cogumelos-shitake.jpg', 'Produto ultracongelado em forma de meia-lua, com recheio a base de cogumelos Shitake e vegetais, envolvido por uma cobertura de massa e revestido uniformemente com pao ralado.', '70 g'),
        ('Bacalhau com Natas', 'bacalhau-com-natas.jpg', 'Produto ultracongelado e pre-cozinhado obtido da mistura homogenea do bacalhau com varios ingredientes.', 'Dose individual: 380 g'),
        ('Bacalhau a Bras', 'bacalhau-a-bras.jpg', 'Produto ultracongelado e pre-cozinhado, constituido por uma camada inferior de ingredientes e uma camada superior de batata.', 'Dose individual: 300 g'),
    ]),
    ('Para Fritar', [
        ('Bolinho com Bacalhau', 'fim1.jpg', 'Produto ultracongelado, com a forma tradicional, formado por uma mistura homogenea a base de bacalhau.', 'Mini: 15 g - Medio: 30 g - Extra: 60 g'),
        ('Rissois com Bacalhau', 'fim2.jpg', 'Produto ultracongelado em forma de meia-lua, com recheio a base de bacalhau envolvido por uma cobertura de massa, revestida uniformemente com pao ralado.', 'Mini: 20 g - Medio: 42 g'),
        ('Almofadinhas com Atum', 'fim3.jpg', 'Produto ultracongelado em forma de almofada, com recheio a base de atum envolvido por uma cobertura de massa, revestida uniformemente com pao ralado.', '48 g'),
        ('Panqueca com Bacalhau', 'fim4.jpg', 'Produto ultracongelado, com a forma tradicional, formado por uma mistura homogenea a base de bacalhau.', '50 g'),
    ]),
]


def wrap(text, font, size, max_width):
    words = text.split()
    lines, current = [], ''
    for word in words:
        candidate = f'{current} {word}'.strip()
        if stringWidth(candidate, font, size) <= max_width:
            current = candidate
        else:
            lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def image_contain(pdf, image_path, x, y, width, height):
    image = ImageReader(str(image_path))
    source_width, source_height = image.getSize()
    scale = min(width / source_width, height / source_height)
    draw_width, draw_height = source_width * scale, source_height * scale
    pdf.drawImage(image, x + (width - draw_width) / 2, y + (height - draw_height) / 2, draw_width, draw_height, mask='auto')


def footer(pdf, page):
    pdf.setStrokeColor(HexColor('#8bb7ba'))
    pdf.setLineWidth(.5)
    pdf.line(46, 36, PAGE_WIDTH - 46, 36)
    pdf.setFillColor(MUTED)
    pdf.setFont('Helvetica-Bold', 7.5)
    pdf.drawString(46, 21, 'FRIGOSTO  |  O SABOR QUE DA GOSTO')
    pdf.drawRightString(PAGE_WIDTH - 46, 21, f'CATALOGO DE PRODUTOS  |  {page:02d}')


def cover(pdf):
    pdf.setFillColor(INK)
    pdf.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, fill=1, stroke=0)
    pdf.setFillColor(HexColor('#0d3441'))
    pdf.circle(PAGE_WIDTH - 70, PAGE_HEIGHT + 70, 260, fill=1, stroke=0)
    pdf.setStrokeColor(AQUA)
    pdf.setLineWidth(1)
    pdf.line(48, 87, 48, PAGE_HEIGHT - 87)
    logo = ROOT / 'frigosto.png'
    image_contain(pdf, logo, 64, PAGE_HEIGHT - 172, 280, 92)
    pdf.setFillColor(AQUA)
    pdf.setFont('Helvetica-Bold', 10)
    pdf.drawString(68, 246, 'CATALOGO VIRTUAL')
    pdf.setFillColor(PAPER)
    pdf.setFont('Times-Roman', 48)
    pdf.drawString(64, 177, 'Solucoes prontas')
    pdf.drawString(64, 124, 'para cada momento.')
    pdf.setFillColor(HexColor('#b9d2d1'))
    pdf.setFont('Helvetica', 14)
    pdf.drawString(68, 83, 'Forno e Air Fryer  |  Para Fritar')
    pdf.setStrokeColor(HexColor('#448a95'))
    pdf.rect(PAGE_WIDTH - 304, 70, 222, 330, fill=0, stroke=1)
    pdf.setFillColor(HexColor('#a5d9d7'))
    pdf.setFont('Helvetica-Bold', 9)
    pdf.drawRightString(PAGE_WIDTH - 96, 48, 'RELATO TEMPORAL')
    pdf.showPage()


def product_page(pdf, group, index, product, page):
    name, image_name, description, weight = product
    pdf.setFillColor(PAPER)
    pdf.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, fill=1, stroke=0)
    pdf.setFillColor(INK)
    pdf.rect(0, PAGE_HEIGHT - 68, PAGE_WIDTH, 68, fill=1, stroke=0)
    pdf.setFillColor(AQUA)
    pdf.setFont('Helvetica-Bold', 9)
    pdf.drawString(48, PAGE_HEIGHT - 42, f'FRIGOSTO / {group.upper()}')
    pdf.setFillColor(HexColor('#bfd7d5'))
    pdf.setFont('Helvetica-Bold', 8)
    pdf.drawRightString(PAGE_WIDTH - 48, PAGE_HEIGHT - 42, f'REFERENCIA {index:02d}')

    image_x, image_y, image_w, image_h = 48, 78, 348, 390
    pdf.setFillColor(HexColor('#e0ebea'))
    pdf.roundRect(image_x, image_y, image_w, image_h, 2, fill=1, stroke=0)
    pdf.setStrokeColor(HexColor('#92c4c4'))
    pdf.setLineWidth(1)
    pdf.rect(image_x + 10, image_y + 10, image_w - 20, image_h - 20, fill=0, stroke=1)
    image_contain(pdf, ROOT / image_name, image_x + 22, image_y + 22, image_w - 44, image_h - 44)

    text_x, text_width = 450, PAGE_WIDTH - 498
    pdf.setFillColor(BLUE)
    pdf.setFont('Helvetica-Bold', 10)
    pdf.drawString(text_x, 440, group.upper())
    pdf.setFillColor(INK)
    title_lines = wrap(name, 'Times-Roman', 37, text_width)
    title_y = 385
    pdf.setFont('Times-Roman', 37)
    for line in title_lines:
        pdf.drawString(text_x, title_y, line)
        title_y -= 42

    label_y = title_y - 20
    pdf.setFillColor(AQUA)
    pdf.setFont('Helvetica-Bold', 9)
    pdf.drawString(text_x, label_y, 'DESCRICAO DO PRODUTO')
    pdf.setFillColor(MUTED)
    pdf.setFont('Helvetica', 12)
    body_y = label_y - 29
    for line in wrap(description, 'Helvetica', 12, text_width):
        pdf.drawString(text_x, body_y, line)
        body_y -= 18

    weight_y = max(125, body_y - 34)
    pdf.setStrokeColor(LINE)
    pdf.line(text_x, weight_y + 31, PAGE_WIDTH - 48, weight_y + 31)
    pdf.setFillColor(AQUA)
    pdf.setFont('Helvetica-Bold', 9)
    pdf.drawString(text_x, weight_y + 13, 'PESO')
    pdf.setFillColor(INK)
    pdf.setFont('Helvetica-Bold', 13)
    pdf.drawRightString(PAGE_WIDTH - 48, weight_y + 13, weight)
    footer(pdf, page)
    pdf.showPage()


def build():
    pdf = canvas.Canvas(str(OUTPUT), pagesize=landscape(A4), pageCompression=1)
    pdf.setTitle('Catalogo Frigosto')
    pdf.setAuthor('Relato Temporal')
    pdf.setSubject('Catalogo virtual de produtos Frigosto')
    cover(pdf)
    page, index = 2, 1
    for group, products in GROUPS:
        for product in products:
            product_page(pdf, group, index, product, page)
            page += 1
            index += 1
    pdf.save()
    print(f'Created {OUTPUT} with {page - 1} pages')


if __name__ == '__main__':
    build()
