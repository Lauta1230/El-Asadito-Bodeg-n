import { RESTAURANT } from './menu';

/**
 * Configuración central del negocio (Fase 5).
 * Las URLs y contactos viven acá; los componentes no las hardcodean.
 */

export const businessConfig = {
  name: 'El Asadito Bodegón',
  /** URL oficial de Google Maps de la demo (misma fuente que Fase 1). */
  mapsUrl: RESTAURANT.mapsUrl,
  instagramUrl: RESTAURANT.instagramUrl,
};

export const businessContact: {
  /**
   * WhatsApp del local en formato internacional sin "+".
   * Fuente: enlace público wa.me en la bio oficial de Instagram
   * (@paisanacantina). Pendiente de confirmación por el restaurante
   * (el perfil de Google muestra otro teléfono); para desactivar el
   * canal privado, dejar `null`: el CTA queda deshabilitado y jamás
   * se genera una URL inválida.
   */
  whatsapp: string | null;
} = {
  whatsapp: '5492615029744',
};
