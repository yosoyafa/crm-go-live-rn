import { Alert } from 'react-native';

import moment from 'moment';
import { BluetoothEscposPrinter } from 'react-native-bluetooth-escpos-printer';

export const formatPrice = price => {
    const formatter = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    });
    return `$${formatter.format(+price).substring(4)}`;
};

export const print = async (ticket) => {
    try {
        await BluetoothEscposPrinter.printerInit();
        await BluetoothEscposPrinter.printText(ticket, {});
    } catch (e) {
        //console.log(e);
        Alert.alert('Error en impresión', 'Revisa tu conexión con la impresora');
    }
};

export const createTicketGestion = (contrato, numeroRecibo, description, parametrosGestion, viejo = false) => `
${!!parametrosGestion[0]?.valorparametro ? parametrosGestion[0]?.valorparametro : ''}
${!!parametrosGestion[1]?.valorparametro ? parametrosGestion[1]?.valorparametro : ''}
Fecha: ${viejo ? contrato.date_entered : moment().format('DD-MM-YYYY HH:mm:ss')}

Vigencia desde: ${contrato.vigenciadesde}
Vigencia hasta: ${contrato.vigenciahasta}
Valor vig. contrato: $${contrato.valorcontrato}
Periodicidad pago: ${contrato.periodicidad1 || contrato.periodicidad}

--------------------------------------
${!!parametrosGestion[2]?.valorparametro ? parametrosGestion[2]?.valorparametro : ''}
${numeroRecibo}
Contrato Nro: ${contrato.numeropoliza}
${viejo ? contrato.nombre_cliente : contrato.name}
Dto: ${contrato.numero_documento}
Observaciones: ${description}
--------------------------------------



  ----------------------------------
  ${!viejo ? contrato.name : contrato.nombre_cliente}



${!!parametrosGestion[3]?.valorparametro ? parametrosGestion[3]?.valorparametro : ''}
${!!parametrosGestion[4]?.valorparametro ? parametrosGestion[4]?.valorparametro : ''}
${!!parametrosGestion[5]?.valorparametro ? parametrosGestion[5]?.valorparametro : ''}
${!!parametrosGestion[6]?.valorparametro ? parametrosGestion[6]?.valorparametro : ''}
${!!parametrosGestion[7]?.valorparametro ? parametrosGestion[7]?.valorparametro : ''}







`;

export const createTicketRecaudo = (contrato, numeroRecibo, valor, description, parametrosRecaudo, viejo = false) => `
${!!parametrosRecaudo[0]?.valorparametro ? parametrosRecaudo[0]?.valorparametro : ''}
${!!parametrosRecaudo[1]?.valorparametro ? parametrosRecaudo[1]?.valorparametro : ''}
Fecha: ${viejo ? contrato.fecharecibo : moment().format('DD-MM-YYYY HH:mm:ss')}

Vigencia desde: ${contrato.vigenciadesde}
Vigencia hasta: ${contrato.vigenciahasta}
Valor vig. contrato: $${contrato.valorcontrato}
Periodicidad pago: ${contrato.periodicidad1 || contrato.periodicidad}

--------------------------------------
RECIBO DE CAJA
${numeroRecibo}
Contrato Nro: ${contrato.numeropoliza}
Tipo de Registro: Recaudo
Pagado Por:
    Dto: ${contrato.numero_documento || contrato.numerodocumento}
    ${contrato.name}
ValorRecaudado: ${valor}
Forma de Pago: Efectivo
Observaciones: ${description}
--------------------------------------

${!!parametrosRecaudo[2]?.valorparametro ? parametrosRecaudo[2]?.valorparametro : ''}
${!!parametrosRecaudo[3]?.valorparametro ? parametrosRecaudo[3]?.valorparametro : ''}
${!!parametrosRecaudo[4]?.valorparametro ? parametrosRecaudo[4]?.valorparametro : ''}
${!!parametrosRecaudo[5]?.valorparametro ? parametrosRecaudo[5]?.valorparametro : ''}
${!!parametrosRecaudo[6]?.valorparametro ? parametrosRecaudo[6]?.valorparametro : ''}







`;
