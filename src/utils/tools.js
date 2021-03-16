export const formatPrice = price => {
    const formatter = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    });
    return `$${formatter.format(+price).substring(4)}`;
}