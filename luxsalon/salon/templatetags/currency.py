from decimal import Decimal, InvalidOperation, ROUND_HALF_UP

from django import template

register = template.Library()


def _to_decimal(value):
    if value is None:
        return None
    if isinstance(value, Decimal):
        return value
    try:
        # Avoid float artifacts by converting through str().
        return Decimal(str(value))
    except (InvalidOperation, ValueError, TypeError):
        return None


@register.filter(name="currency")
def currency(value, symbol="AED"):
    """
    Format a numeric value as a currency string.

    Usage:
      {% load currency %}
      {{ amount|currency:"AED" }}
      {{ amount|currency:"د.إ" }}
    """
    dec = _to_decimal(value)
    if dec is None:
        return "" if value in (None, "") else value

    dec = dec.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
    formatted = f"{dec:,.2f}"
    symbol = (symbol or "").strip()
    return f"{symbol} {formatted}".strip()


@register.filter(name="aed")
def aed(value):
    """
    Convenience filter for UAE Dirham.

    Usage:
      {% load currency %}
      {{ amount|aed }}
    """
    return currency(value, "د.إ")

