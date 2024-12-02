
import Profile from "./Profilenav";
import Application from "./Application";
import ApplicationMobileCard from "./ApplicationMobileCard";

export default function WrapperProfile() {
  return (
    <section className="py-10">

        <div className="p-3 py-5 max-w-[1340px] mx-auto">

<Profile/>
<Application/>
<ApplicationMobileCard/>
        </div>
      
    </section>
  )
}
