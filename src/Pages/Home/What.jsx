import Container from "../../Components/Container";
import tham from "../../assets/Banner/tham.webp";
const What = () => {
  return (
    <Container>
      <div className="mt-16">
        <h1 className="text-3xl font-bold text-center">
          What Exactly is an Asset?
        </h1>
        <p className="text-center text-base">
          The better question is, what isn’t an asset? From IT and construction
          to education and retail, every business has items of value that they
          need to keep track of. Some are digital, like contracts and software
          licenses, while others are physical, like laptops and vehicle fleets.
          Whatever you’re tracking, we’re here to help your team improve
          efficiency and save time and money.
        </p>
        <div className="flex mt-16 gap-16 justify-between">
          <div className="w-1/2 flex flex-col justify-center">
            <div className="max-w-[520px]">
              <h2 className="text-3xl font-bold">
                Track everything from computers to contracts
              </h2>
              <p className="mt-4 mb-8">
                Your business is unique, and so is your stuff. That’s why we’ve
                made our web and mobile technology highly flexible to cater to
                your specific items and use cases – no need to change the way
                you work.
              </p>
              <p>
                Better asset tracking leads to better business performance –
                when you keep your equipment in working order and know where it
                is, you prevent losses from damage or theft.
              </p>
            </div>
          </div>
          <div className="w-1/2">
            <img className="w-full" src={tham} alt="" />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default What;
