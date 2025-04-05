export default function RefundPolicy() {
    return (
      <div className="max-w-4xl  text-gray-500  mx-auto py-12 px-4 mt-60">
        <h1 className="text-3xl font-bold mb-8">Refund Policy</h1>
        
        <div className="prose max-w-none">
          <section className="mb-8">
            <p className="mb-4">
              We offer exchange and returns on items that are either damaged or defective. Minor shade differences 
              or minor artwork differences can be there as all the items are handmade.
            </p>
            <p className="mb-4">
              We request our customers to make an opening video of parcels as guided by our shipping partners 
              to ensure if there is any damage due to mishandling. After reviewing the package opening videos 
              our quality team makes a decision on the refund or exchange.
            </p>
            <p className="mb-4">
              Once the decision has been made we create a return for the parcel and once we receive the returned 
              product we either send another item or we refund the amount to the customer as requested. We process 
              all returns within 7-10 working days after the return package has been received.
            </p>
          </section>
  
          <section className="mb-8 bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
            <p className="font-bold mb-2">Please note:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li className="font-bold">Orders once placed cannot be cancelled.</li>
              <li>The request for exchange or refund should be lodged within 5 days after delivery.</li>
              <li>The exchange or return will take place only if there is an uncut/non-edited package opening video.</li>
            </ul>
          </section>
  
          <section className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-xl font-semibold mb-3">Need Help?</h2>
            <p>
              For any refund-related queries, please contact our support team at{' '}
              <a href="mailto:support@budhshiv.com" className="text-blue-600 hover:underline">
                support@budhshiv.com
              </a>
            </p>
          </section>
        </div>
      </div>
    );
  }