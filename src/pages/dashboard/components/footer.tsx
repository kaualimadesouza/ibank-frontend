import { Github, Landmark, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black text-white p-10">
      <div className="max-w-[1096px] m-auto h-full space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 ">
            <Landmark className="size-7" />
            <span className="text-xl font-extrabold">iBank</span>
          </div>
          <nav>
            <ul className="flex items-center gap-4">
              <li className="opacity-40 hover:opacity-100">
                <a href="https://github.com/kaualimadesouza" target="_blank">
                  <Github />
                </a>
              </li>

              <li className="opacity-40 hover:opacity-100">
                <a
                  href="https://www.linkedin.com/in/kaualimadesouza"
                  target="_blank"
                >
                  <Linkedin />
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="text-[#666666] space-y-1">
          <nav>
            <ul className="flex items-center gap-4  font-semibold">
              <li className="hover:underline">
                <a href="#">API Repository</a>
              </li>

              <li className="hover:underline">
                <a href="#">Frontend Repository</a>
              </li>
            </ul>
          </nav>
          <p className="text-xs">
            This is a ficcional bank for a personal project
          </p>
        </div>
      </div>
    </footer>
  );
}
