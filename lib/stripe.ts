import Stripe from 'stripe';
import { isTestMode } from './test-mode';

const stripeKey = isTestMode()
  ? process.env.STRIPE_TEST_SECRET_KEY
  : process.env.STRIPE_SECRET_KEY;

if (!stripeKey) {
  console.warn(
    `Stripe ${isTestMode() ? 'test' : 'live'} secret key is not set. Stripe calls will fail.`
  );
}

export const stripe = new Stripe(stripeKey || '', {
  apiVersion: '2026-04-22.dahlia',
});

export function getWebhookSecret(): string {
  const secret = isTestMode()
    ? process.env.STRIPE_TEST_WEBHOOK_SECRET
    : process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) throw new Error('Stripe webhook secret is not configured');
  return secret;
}

export function getPriceIdPerLocation(): string {
  const id = isTestMode()
    ? process.env.STRIPE_TEST_PRICE_ID_PER_LOCATION
    : process.env.STRIPE_PRICE_ID_PER_LOCATION;
  if (!id) throw new Error('Stripe price ID (per location) is not configured');
  return id;
}

export function getPriceIdBookingAddon(): string {
  const id = isTestMode()
    ? process.env.STRIPE_TEST_PRICE_ID_BOOKING_ADDON
    : process.env.STRIPE_PRICE_ID_BOOKING_ADDON;
  if (!id) throw new Error('Stripe price ID (booking addon) is not configured');
  return id;
}
