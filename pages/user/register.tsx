import { fetchSet } from "lib/fetch";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "lib/context/auth";
import img from "public/kitty.png";
import Image from "next/image";

export default function Register() {
  const { authenticated } = useContext(AuthContext);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      name: { value: string };
      email: { value: string };
      password: { value: string };
    };

    const body = {
      name: target.name.value,
      email: target.email.value,
      password: target.password.value,
    };

    const set = fetchSet({ body });

    try {
      const res = await fetch(window.location.origin + "/api/github", set);
      const json = await res.json();
      if (json.result) {
        const url = new URL(window.location.href);
        window.location.replace(url.origin);
      } else {
        alert("error");
      }
    } catch (e) {
      console.log(e);
    }
  }

  if (authenticated) {
    router.push("/");
  }

  return (
    <div className="h-body flex flex-wrap content-center justify-center ">
      <div className="w-2/3 rounded-md bg-base-300 px-5 py-10 shadow-lg lg:w-1/3">
        <Image src={img} alt="Picture of the author" width={100} height={100} className="mx-auto" />
        <form onSubmit={handleSubmit}>
          <div className="form-control w-full py-3">
            <input type="name" placeholder="Name" id="name" className="input w-full py-3" />
          </div>
          <div className="form-control w-full py-3">
            <input type="email" placeholder="Email" id="email" className="input w-full py-3" />
          </div>
          <div className="form-control w-full py-3">
            <input type="password" placeholder="Password" id="password" className="input w-full py-3" />
          </div>
          <div className="flex justify-center py-3">
            <button type="submit" className="btn-primary  btn w-full">
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
