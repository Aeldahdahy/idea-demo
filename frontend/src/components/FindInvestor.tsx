export default function FindInvestor() {
  return (
    <section className="flex justify-between items-center px-20 py-10 mb-16 bg-indigo-200 rounded-[40px] max-sm:flex-col">
      <div
        dangerouslySetInnerHTML={{
          __html:
            "<svg id=&quot;1756:3132&quot; layer-name=&quot;Text&quot; width=&quot;726&quot; height=&quot;436&quot; viewBox=&quot;0 0 726 436&quot; fill=&quot;none&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot; class=&quot;find-investor-text&quot; style=&quot;width: 726px; height: 436px&quot;> <path d=&quot;M229.668 85H454.829&quot; stroke=&quot;#2661FF&quot; stroke-width=&quot;2&quot;></path> <path d=&quot;M468.541 171H589.06&quot; stroke=&quot;#2661FF&quot; stroke-width=&quot;2&quot;></path> <path d=&quot;M111.314 254H293.897&quot; stroke=&quot;#2661FF&quot; stroke-width=&quot;2&quot;></path> <text fill=&quot;black&quot; xml:space=&quot;preserve&quot; style=&quot;white-space: pre&quot; font-family=&quot;Bitter&quot; font-size=&quot;48&quot; font-weight=&quot;bold&quot; letter-spacing=&quot;-1px&quot;><tspan x=&quot;43.3359&quot; y=&quot;59.08&quot;>Find investor for your project </tspan></text> <text fill=&quot;black&quot; xml:space=&quot;preserve&quot; style=&quot;white-space: pre&quot; font-family=&quot;Bitter&quot; font-size=&quot;32&quot; letter-spacing=&quot;-1px&quot;><tspan x=&quot;16.0938&quot; y=&quot;145.08&quot;>Access the largest opportunities to reach investors </tspan><tspan x=&quot;61.0469&quot; y=&quot;231.08&quot;>in your field. Filter opportunities by country, </tspan><tspan x=&quot;41&quot; y=&quot;317.08&quot;>location, industry, stage, investment range and </tspan><tspan x=&quot;138.906&quot; y=&quot;403.08&quot;>language to find the deal for you.</tspan></text> </svg>",
        }}
      />
      <div className="flex flex-col gap-5">
        <div className="flex gap-2.5 items-center">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/829fd938c7fe31a44ede8921bf9c35bde1b19e6e?placeholderIfAbsent=true"
            alt="Checklist"
            className="h-[41px] w-[41px]"
          />
          <span>Libya</span>
        </div>
        <div className="flex gap-2.5 items-center">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/829fd938c7fe31a44ede8921bf9c35bde1b19e6e?placeholderIfAbsent=true"
            alt="Checklist"
            className="h-[41px] w-[41px]"
          />
          <span>Agriculture</span>
        </div>
      </div>
    </section>
  );
}
