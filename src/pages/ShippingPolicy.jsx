export default function ShippingPolicy() {
    return (
      <div className="max-w-4xl  text-gray-500  mt-60 py-12 px-4">
        <h1 className="text-3xl font-bold mb-6">Shipping Policy</h1>
        
        <div className="space-y-6 text-gray-700">
          <p>
            The majority of the products are made to order and may require a time frame of 7-10 days 
            other than the ones which are in stock. This is because we source directly from local 
            artisans who do not deal in big quantities. We have a great network of shipping partners 
            like DTDC in India and DHL, FEDEX, BLUEDART and UPS for international couriers. Once the 
            product is shipped we notify our client on email by sharing the tracking/AWB bill of the 
            consignment.
          </p>
  
          <div className="bg-yellow-50 p-4 rounded border-l-4 border-yellow-300">
            <p className="font-medium mb-1">Please note:</p>
            <p>
              For all international orders we do door delivery. The Custom duties are charged by local 
              governments in your country. You have to pay the custom duties according to the rules of 
              your country. The Local Delivery agents will contact you if your parcel qualifies for 
              custom duty.
            </p>
          </div>
  
          <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-300">
            <p className="font-medium mb-1">Please note:</p>
            <p>
              Our products usually reach our customers within 5-7 working days in India and 
              International 7-10 days depending on custom clearance. Sometimes it can take longer due 
              to unavoidable circumstances. You can always track the packages by using the tracking 
              ids or links that we provide to your registered email address.
            </p>
          </div>
        </div>
      </div>
    );
  }