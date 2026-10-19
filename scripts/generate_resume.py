from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate, Frame, PageTemplate, Paragraph, Spacer, HRFlowable,
    KeepTogether,
)

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "resume.pdf"

# Content transcribed from src/content.ts, src/data/videos.ts, and the existing
# portfolio PDF. Keep only facts and links present in those sources.
PROFILE = {
    "name": "Reuben John Ranjit",
    "role": "VIDEO EDITOR | VISUAL STORYTELLER",
    "email": "reubenranjit09@gmail.com",
    "summary": (
        "Professional editor blending creativity and strategy to bring a vision to life. "
        "Has led projects with a college media team and collaborated directly with clients "
        "to produce videos, photographs and reels. Focused on on-screen visual narratives "
        "that capture attention and connect with audiences."
    ),
}

SKILLS = [
    ("Video editing", "Brand-aligned editing, captions, colour grading, post-production"),
    ("Video production", "Concept and brief development, scripting, storyboarding, shot planning, filming"),
    ("Photography", "Portrait, product, event and promotional photography"),
    ("Social content", "Reels, promotional hooks and trend-driven short-form content"),
    ("Delivery", "Platform-ready formats and final media delivery"),
]

EXPERIENCE = [
    ("College media team", "Led media projects across video and photography."),
    ("Client collaborations", "Worked directly with clients to create videos, photographs and reels."),
]

PROJECTS = [
    {
        "name": "Break the Loop",
        "context": "Magnovite | Intercollege event",
        "description": "Promotional content for Magnovite, an intercollege event.",
        "url": "https://drive.google.com/file/d/1xcWOEE5pOPoNdn1kYTHvp5eVef1q1SCZ/view",
    },
    {
        "name": "Kendrick Lamar Tribute",
        "context": "Self-directed passion project",
        "description": "A self-directed edit driven by creative exploration.",
        "url": "https://drive.google.com/file/d/19rCs8i2iuJ_-ptCN1X3lmaNqsup3W-Ox/view",
    },
    {
        "name": "Client Edit - Gokarna",
        "context": "Client collaboration",
        "description": "Produced a client edit for an immersive trip to Gokarna.",
        "url": "https://drive.google.com/file/d/1G9yxo9TJAGd9LoupqXrkj0ki9yUU4A9K/view",
    },
    {
        "name": "Bhasha Utsav",
        "context": "College cultural event",
        "description": "Promotional content for a college cultural event.",
        "url": None,
    },
]

FONT_PAIRS = [
    (Path(r"C:\Windows\Fonts\arial.ttf"), Path(r"C:\Windows\Fonts\arialbd.ttf")),
    (Path("/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf"), Path("/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf")),
    (Path("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"), Path("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf")),
]
FONT_PAIR = next(((regular, bold) for regular, bold in FONT_PAIRS if regular.exists() and bold.exists()), None)
if FONT_PAIR:
    pdfmetrics.registerFont(TTFont("ResumeSans", str(FONT_PAIR[0])))
    pdfmetrics.registerFont(TTFont("ResumeSans-Bold", str(FONT_PAIR[1])))
else:
    pdfmetrics.registerFontFamily("Helvetica", normal="Helvetica", bold="Helvetica-Bold")
    pdfmetrics.registerFontFamily("Helvetica-Bold", normal="Helvetica", bold="Helvetica-Bold")
    pdfmetrics.registerFontFamily("ResumeSans", normal="Helvetica", bold="Helvetica-Bold")
    pdfmetrics.registerFontFamily("ResumeSans-Bold", normal="Helvetica", bold="Helvetica-Bold")

INK = colors.HexColor("#202328")
MUTED = colors.HexColor("#59616A")
ACCENT = colors.HexColor("#F25424")
RULE = colors.HexColor("#D8D9D6")
PAPER = colors.HexColor("#FBFAF7")
PANEL = colors.HexColor("#171715")

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(
    name="ResumeName", fontName="ResumeSans-Bold", fontSize=28, leading=32,
    textColor=colors.white, spaceAfter=3,
))
styles.add(ParagraphStyle(
    name="ResumeRole", fontName="ResumeSans-Bold", fontSize=9, leading=13,
    textColor=ACCENT, tracking=1.2, spaceAfter=3,
))
styles.add(ParagraphStyle(
    name="ResumeTagline", fontName="ResumeSans", fontSize=9.2, leading=13,
    textColor=colors.HexColor("#D7D5CF"), spaceAfter=5,
))
styles.add(ParagraphStyle(
    name="ResumeContact", fontName="ResumeSans", fontSize=8.8, leading=12,
    textColor=colors.HexColor("#D7D5CF"), spaceAfter=0,
))
styles.add(ParagraphStyle(
    name="ResumeSection", fontName="ResumeSans-Bold", fontSize=10.2, leading=14,
    textColor=INK, spaceBefore=13, spaceAfter=5, tracking=.7,
))
styles.add(ParagraphStyle(
    name="ResumeBody", fontName="ResumeSans", fontSize=9.4, leading=14,
    textColor=INK, spaceAfter=3,
))
styles.add(ParagraphStyle(
    name="ResumeLabel", fontName="ResumeSans-Bold", fontSize=9.3, leading=13,
    textColor=INK,
))
styles.add(ParagraphStyle(
    name="ResumeMuted", fontName="ResumeSans", fontSize=8.9, leading=12,
    textColor=MUTED,
))
styles.add(ParagraphStyle(
    name="ResumeProject", fontName="ResumeSans", fontSize=9.3, leading=13,
    textColor=INK,
))


def footer(canvas, doc):
    canvas.saveState()
    width, height = letter
    canvas.setFillColor(PAPER)
    canvas.rect(0, 0, width, height, fill=1, stroke=0)
    canvas.setFillColor(PANEL)
    canvas.rect(0, height - 140, width, 140, fill=1, stroke=0)
    canvas.setFillColor(ACCENT)
    canvas.rect(doc.leftMargin, height - 140, 3, 140, fill=1, stroke=0)
    canvas.setStrokeColor(RULE)
    canvas.setLineWidth(.5)
    canvas.line(doc.leftMargin, 0.43 * inch, width - doc.rightMargin, 0.43 * inch)
    canvas.setFont("ResumeSans", 7.5)
    canvas.setFillColor(MUTED)
    canvas.drawString(doc.leftMargin, 0.27 * inch, "REUBEN JOHN RANJIT  |  RESUME")
    canvas.drawRightString(width - doc.rightMargin, 0.27 * inch, f"{doc.page:02d}")
    canvas.restoreState()


def section(title):
    number, label = title.split("  |  ", 1)
    return [
        Paragraph(f'<font color="#F25424">{number}</font>  |  {label.upper()}', styles["ResumeSection"]),
        HRFlowable(width="100%", thickness=.6, color=RULE, spaceAfter=6),
    ]


def make_story():
    story = [
        Paragraph(PROFILE["name"], styles["ResumeName"]),
        Paragraph(PROFILE["role"], styles["ResumeRole"]),
        Paragraph("Creating stories that stick.", styles["ResumeTagline"]),
        Paragraph(f'<link href="mailto:{PROFILE["email"]}" color="#D7D5CF">{PROFILE["email"]}</link>', styles["ResumeContact"]),
        Spacer(1, 18),
    ]
    story += section("01  |  Profile")
    story.append(Paragraph(PROFILE["summary"], styles["ResumeBody"]))

    story += section("02  |  Core Skills")
    for label, details in SKILLS:
        story.append(Paragraph(f'<font name="ResumeSans-Bold">{label}:</font> {details}', styles["ResumeBody"]))

    story += section("03  |  Experience & Collaboration")
    for title, details in EXPERIENCE:
        story.append(KeepTogether([
            Paragraph(title, styles["ResumeLabel"]),
            Paragraph(details, styles["ResumeMuted"]),
            Spacer(1, 4),
        ]))

    story += section("04  |  Selected Projects")
    for project in PROJECTS:
        title = project["name"]
        if project["url"]:
            title = f'<link href="{project["url"]}" color="#E94E2A"><font name="ResumeSans-Bold">{title}</font></link>'
        context = f'<font color="#59616A">{project["context"]}</font>'
        project_link = f'  <link href="{project["url"]}" color="#E94E2A"><font size="7"><b>VIEW PROJECT</b></font></link>' if project["url"] else ""
        story.append(KeepTogether([
            Paragraph(f"{title}  |  {context}{project_link}", styles["ResumeProject"]),
            Paragraph(project["description"], styles["ResumeMuted"]),
            Spacer(1, 5),
        ]))
    return story


class ResumeDoc(BaseDocTemplate):
    def __init__(self, filename):
        super().__init__(
            str(filename), pagesize=letter,
            leftMargin=.72 * inch, rightMargin=.72 * inch,
            topMargin=.56 * inch, bottomMargin=.62 * inch,
            title=f"Resume - {PROFILE['name']}",
            author=PROFILE["name"],
            subject="Video editor and visual storyteller resume",
        )
        frame = Frame(self.leftMargin, self.bottomMargin, self.width, self.height, id="resume")
        self.addPageTemplates([PageTemplate(id="resume", frames=[frame], onPage=footer)])


if __name__ == "__main__":
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    ResumeDoc(OUTPUT).build(make_story())
    print(OUTPUT)
