
//Testing...
import { render, screen } from '@testing-library/react';

//Components
import Home, { getStaticProps } from '../../pages';

//Libs
import { stripe } from '../../services/stripe';
import { mocked } from 'jest-mock';

jest.mock('next-auth/client', () => {
  return {
    useSession() {
      return [null, false]
    }
  }
});
jest.mock('next/router', () => {
  return {
    useRouter() {
      return '/'
    }
  }
});
jest.mock('../../services/stripe');


describe('Home page', () => {

  it('Renders correctly', () => {

    const productFake = {
      priceId: 'fake-price-id',
      amount: '$10.00',
    }

    render(< Home product={productFake} />)
    expect(screen.getByText('for $10.00 month')).toBeInTheDocument();

  });

  it('loads initial data', async () => {

    const retrieveStripeMocked = mocked(stripe.prices.retrieve);

    retrieveStripeMocked.mockResolvedValueOnce({
      id: 'fake-price-id',
      unit_amount: 1000,
    } as any)

    const response = await getStaticProps({})
    
    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId: 'fake-price-id',
            amount: '$10.00'
          }
        }
      })
    )
  })
})