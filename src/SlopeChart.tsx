// SlopeChart.tsx
import React, { useMemo, useRef, useState } from "react";
import * as d3 from "d3";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Dancer {
  name: string;
  inYear: number;
  outYear: number;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const rawData: Dancer[] = [
  { name: "Adelaide Case", inYear: 1952, outYear: 1952 },
  { name: "Alan Good", inYear: 1978, outYear: 1994 },
  { name: "Albert Reid", inYear: 1964, outYear: 1968 },
  { name: "Andrea Weber", inYear: 2004, outYear: 2011 },
  { name: "Anita Dencks", inYear: 1953, outYear: 1955 },
  { name: "Anneliese Widman", inYear: 1950, outYear: 1953 },
  { name: "Ashley Chen", inYear: 2000, outYear: 2003 },
  { name: "Banu Ogan", inYear: 1993, outYear: 2000 },
  { name: "Barbara Lias", inYear: 1972, outYear: 1973 },
  { name: "Barbara Lloyd", inYear: 1963, outYear: 1968 },
  { name: "Betty Nichols", inYear: 1949, outYear: 1949 },
  { name: "Brandon Collwes", inYear: 2006, outYear: 2011 },
  { name: "Bruce King", inYear: 1955, outYear: 1958 },
  { name: "Brynar Mehl", inYear: 1972, outYear: 1973 },
  { name: "Carol Teitelbaum", inYear: 1986, outYear: 1993 },
  { name: "Carolyn Brown", inYear: 1953, outYear: 1972 },
  { name: "Catherine Kerr", inYear: 1974, outYear: 1988 },
  { name: "Cédric Andrieux", inYear: 1999, outYear: 2007 },
  { name: "Charles Moulton", inYear: 1974, outYear: 1976 },
  { name: "Chase Robinson", inYear: 1968, outYear: 1972 },
  { name: "Cheryl Therrien", inYear: 1993, outYear: 2003 },
  { name: "China Laudisio", inYear: 1993, outYear: 1997 },
  { name: "Chris Komar", inYear: 1972, outYear: 1996 },
  { name: "Connie Kuhni", inYear: 1944, outYear: 1944 },
  { name: "Cynthia Stone", inYear: 1957, outYear: 1958 },
  { name: "Daniel Madoff", inYear: 2007, outYear: 2011 },
  { name: "Daniel Roberts", inYear: 2000, outYear: 2005 },
  { name: "Daniel Squire", inYear: 1998, outYear: 2009 },
  { name: "David Kulick", inYear: 1986, outYear: 2000 },
  { name: "Deborah Hay", inYear: 1964, outYear: 1964 },
  { name: "Deborah Moscowitz", inYear: 1953, outYear: 1953 },
  { name: "Dennis O'Connor", inYear: 1986, outYear: 1989 },
  { name: "Derry Swan", inYear: 1996, outYear: 2004 },
  { name: "Donald McKayle", inYear: 1952, outYear: 1952 },
  { name: "Dorothy Berea", inYear: 1947, outYear: 1950 },
  { name: "Douglas Dunn", inYear: 1969, outYear: 1973 },
  { name: "Dylan Crossman", inYear: 2009, outYear: 2011 },
  { name: "Ellen Cornfield", inYear: 1974, outYear: 1983 },
  { name: "Emily Navar", inYear: 1990, outYear: 1991 },
  { name: "Emma Desjardins", inYear: 2006, outYear: 2011 },
  { name: "Emma Diamond", inYear: 1988, outYear: 1994 },
  { name: "Ethel Brodsky", inYear: 1953, outYear: 1953 },
  { name: "Fawn Pickett", inYear: 1944, outYear: 1944 },
  { name: "François Canton", inYear: 1950, outYear: 1950 },
  { name: "Frédéric Gafner", inYear: 1991, outYear: 1998 },
  { name: "George Lang", inYear: 1944, outYear: 1944 },
  { name: "Glen Rumsey", inYear: 1993, outYear: 1999 },
  { name: "Greta Rosenzweig", inYear: 1952, outYear: 1952 },
  { name: "Gus Solomons jr", inYear: 1965, outYear: 1968 },
  { name: "Helaine Berley", inYear: 1952, outYear: 1952 },
  { name: "Helen Barrow", inYear: 1982, outYear: 1993 },
  { name: "Holley Farmer", inYear: 1997, outYear: 2009 },
  { name: "Jamie Scott", inYear: 2009, outYear: 2011 },
  { name: "Jared Phillips", inYear: 1993, outYear: 1998 },
  { name: "Jean Cummings", inYear: 1944, outYear: 1944 },
  { name: "Jean Erdman", inYear: 1942, outYear: 1943 },
  { name: "Jean Freebury", inYear: 1992, outYear: 2003 },
  { name: "Jeannie Steele", inYear: 1993, outYear: 2005 },
  { name: "Jeff Slayton", inYear: 1968, outYear: 1970 },
  { name: "Jenifer Weaver", inYear: 1989, outYear: 1996 },
  { name: "Jennifer Goggans", inYear: 2000, outYear: 2011 },
  { name: "Jim Self", inYear: 1977, outYear: 1979 },
  { name: "Jo Anne Melsher", inYear: 1952, outYear: 1954 },
  { name: "Joan Frederiksen", inYear: 1944, outYear: 1944 },
  { name: "Joan Skinner", inYear: 1952, outYear: 1953 },
  { name: "Joanne Finkelor", inYear: 1952, outYear: 1952 },
  { name: "John Hinrichs", inYear: 2009, outYear: 2011 },
  { name: "Jonah Bokaer", inYear: 2000, outYear: 2007 },
  { name: "Joseph Lennon", inYear: 1978, outYear: 1984 },
  { name: "Judith Dunn", inYear: 1959, outYear: 1963 },
  { name: "Judith Martin", inYear: 1947, outYear: 1947 },
  { name: "Judy Lazaroff", inYear: 1981, outYear: 1983 },
  { name: "Julie Cunningham", inYear: 2004, outYear: 2011 },
  { name: "Julie Harris", inYear: 1944, outYear: 1944 },
  { name: "Julie Roess-Smith", inYear: 1973, outYear: 1977 },
  { name: "Julie Walter", inYear: 1950, outYear: 1950 },
  { name: "Karen Attix", inYear: 1974, outYear: 1976 },
  { name: "Karen Radford", inYear: 1983, outYear: 1987 },
  { name: "Karole Armitage", inYear: 1975, outYear: 1981 },
  { name: "Katherine Litz", inYear: 1946, outYear: 1946 },
  { name: "Kevin Schroder", inYear: 1985, outYear: 1986 },
  { name: "Kimberly Bartosik", inYear: 1987, outYear: 1996 },
  { name: "Koji Mizuta", inYear: 1998, outYear: 2009 },
  { name: "Kristy Santimyer", inYear: 1985, outYear: 1989 },
  { name: "Larissa McGoldrick", inYear: 1987, outYear: 1993 },
  { name: "Leora Dana", inYear: 1944, outYear: 1947 },
  { name: "Lisa Boudreau", inYear: 1994, outYear: 2008 },
  { name: "Lisa Fox", inYear: 1977, outYear: 1980 },
  { name: "Lise Friedman", inYear: 1977, outYear: 1984 },
  { name: "Louise Burns", inYear: 1970, outYear: 1984 },
  { name: "Louise Lippold", inYear: 1948, outYear: 1948 },
  { name: "Mandy Kirschner", inYear: 2000, outYear: 2003 },
  { name: "Marcie Munnerlyn", inYear: 2004, outYear: 2007 },
  { name: "Marianne Preger-Simon", inYear: 1950, outYear: 1958 },
  { name: "Marilyn Wood", inYear: 1958, outYear: 1963 },
  { name: "Marlise Bok", inYear: 1944, outYear: 1944 },
  { name: "Martha Hindle", inYear: 1944, outYear: 1944 },
  { name: "Matthew Mohr", inYear: 1994, outYear: 2000 },
  { name: "Meg Eginton", inYear: 1977, outYear: 1980 },
  { name: "Meg Harper", inYear: 1968, outYear: 1977 },
  { name: "Megan Walker", inYear: 1980, outYear: 1986 },
  { name: "Mel Wong", inYear: 1968, outYear: 1972 },
  { name: "Melissa Toogood", inYear: 2008, outYear: 2011 },
  { name: "Michael Cole", inYear: 1989, outYear: 1998 },
  { name: "Mili Churchill", inYear: 1947, outYear: 1951 },
  { name: "Milorad Miskovitch", inYear: 1949, outYear: 1949 },
  { name: "Morgan Ensminger", inYear: 1975, outYear: 1978 },
  { name: "Naima Wallenrod", inYear: 1952, outYear: 1952 },
  { name: "Nanette Hassall", inYear: 1971, outYear: 1972 },
  { name: "Natanya Neumann", inYear: 1952, outYear: 1953 },
  { name: "Neil Greenberg", inYear: 1980, outYear: 1986 },
  { name: "Paige Cunningham", inYear: 2000, outYear: 2004 },
  { name: "Patricia Birch", inYear: 1944, outYear: 1944 },
  { name: "Patricia Lawrence", inYear: 1944, outYear: 1944 },
  { name: "Patricia Lent", inYear: 1984, outYear: 1993 },
  { name: "Paul Taylor", inYear: 1953, outYear: 1954 },
  { name: "Peter Saul", inYear: 1965, outYear: 1967 },
  { name: "Phyllis Backer", inYear: 1952, outYear: 1952 },
  { name: "Rachel Rosenthal", inYear: 1950, outYear: 1950 },
  { name: "Randall Sanderson", inYear: 1990, outYear: 1992 },
  { name: "Rashaun Mitchell", inYear: 2004, outYear: 2011 },
  { name: "Raymond Kurshals", inYear: 1975, outYear: 1976 },
  { name: "Rob Remley", inYear: 1978, outYear: 1987 },
  { name: "Robert Kovich", inYear: 1973, outYear: 1980 },
  { name: "Robert Swinston", inYear: 1980, outYear: 2011 },
  { name: "Robert Wood", inYear: 1988, outYear: 1991 },
  { name: "Ronne Aul", inYear: 1952, outYear: 1952 },
  { name: "Sandra Neels", inYear: 1963, outYear: 1973 },
  { name: "Sara Hamill", inYear: 1947, outYear: 1948 },
  { name: "Shareen Blair", inYear: 1961, outYear: 1964 },
  { name: "Shirley Broughton", inYear: 1944, outYear: 1944 },
  { name: "Silas Riener", inYear: 2007, outYear: 2011 },
  { name: "Stanton Schumutz", inYear: 1944, outYear: 1944 },
  { name: "Steve Paxton", inYear: 1961, outYear: 1964 },
  { name: "Sudie Bond", inYear: 1950, outYear: 1952 },
  { name: "Susan Emery", inYear: 1977, outYear: 1984 },
  { name: "Susan Quinn", inYear: 1981, outYear: 1987 },
  { name: "Susana Hayman-Chaffey", inYear: 1968, outYear: 1976 },
  { name: "Tanaquil LeClerq", inYear: 1949, outYear: 1950 },
  { name: "Thomas Caley", inYear: 1993, outYear: 2000 },
  { name: "Timothy LaFarge", inYear: 1953, outYear: 1954 },
  { name: "Ulysses Dove", inYear: 1970, outYear: 1973 },
  { name: "Valda Setterfield", inYear: 1961, outYear: 1975 },
  { name: "Victoria Finlayson", inYear: 1984, outYear: 1992 },
  { name: "Viola Farber", inYear: 1953, outYear: 1970 },
  { name: "Virginia Bosler", inYear: 1946, outYear: 1947 },
  { name: "Virginia Tanner", inYear: 1944, outYear: 1944 },
  { name: "Vivian Steinberg", inYear: 1944, outYear: 1944 },
  { name: "Els Grelinger", inYear: 1944, outYear: 1944 },
  { name: "Olga Lunick", inYear: 1947, outYear: 1947 },
  { name: "Pat McBride", inYear: 1950, outYear: 1950 },
  { name: "Diane Walters", inYear: 1950, outYear: 1950 },
  { name: "William Davies", inYear: 1963, outYear: 1964 },
  { name: "Yseult Riopelle", inYear: 1966, outYear: 1967 },
  { name: "Remy Charlip", inYear: 1950, outYear: 1961 },
  { name: "Karen Bell-Kanner", inYear: 1957, outYear: 1957 },
  { name: "William Burdick", inYear: 1958, outYear: 1958 },
  { name: "Dan Wagoner", inYear: 1959, outYear: 1959 },
  { name: "Jack Moore", inYear: 1960, outYear: 1960 },
  { name: "Niklas Ek", inYear: 1966, outYear: 1966 },
  { name: "Edward Henkel", inYear: 1971, outYear: 1971 },
  { name: "Krista Nelson", inYear: 2010, outYear: 2011 },
];

// ─── Highlight config ────────────────────────────────────────────────────────
const TENURE_HIGHLIGHT_COUNT = 8;

const MANUAL_HIGHLIGHTS: { name: string; url?: string }[] = [
  {
    name: "Donald McKayle",
    url: "https://ailey.org/people/donald-mckayle",
  },
];

const HIGHLIGHT_COLOR_TENURE = "#f59e0b";
const HIGHLIGHT_COLOR_MANUAL = "#ef4444";

// ─── Lookup helpers ──────────────────────────────────────────────────────────
const manualHighlightMap = new Map(MANUAL_HIGHLIGHTS.map((h) => [h.name, h]));

function tenureColor(d: Dancer): string {
  const duration = d.outYear - d.inYear;
  if (duration === 0) return "#bbb";
  if (duration <= 3) return "#93c5fd";
  if (duration <= 8) return "#3b82f6";
  if (duration <= 15) return "#6366f1";
  return "#a855f7";
}

// ─── Eras ────────────────────────────────────────────────────────────────────
const eras: { label: string; range: [number, number] | null }[] = [
  { label: "All", range: null },
  { label: "1940s–50s", range: [1940, 1959] },
  { label: "1960s–70s", range: [1960, 1979] },
  { label: "1980s–90s", range: [1980, 1999] },
  { label: "2000s–11", range: [2000, 2011] },
];

// ─── Link icon ───────────────────────────────────────────────────────────────
const LinkIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 10,
  color = "currentColor",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ marginLeft: 4, verticalAlign: "middle" }}
  >
    <path d="M7 3h6v6" />
    <path d="M13 3L7 9" />
    <path d="M5 3H3a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1v-2" />
  </svg>
);

// ─── Component ───────────────────────────────────────────────────────────────
interface SlopeChartProps {
  width?: number;
  height?: number;
}

const SlopeChart: React.FC<SlopeChartProps> = ({
  width = 960,
  height = 1800,
}) => {
  const [hoveredDancer, setHoveredDancer] = useState<string | null>(null);
  const [selectedEra, setSelectedEra] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const margin = { top: 60, right: 220, bottom: 40, left: 220 };
  const innerW = width - margin.left - margin.right;

  const data = useMemo(() => {
    return [...rawData].sort(
      (a, b) => a.inYear - b.inYear || a.outYear - b.outYear,
    );
  }, []);

  // Highlighted dancer names (computed from full dataset)
  const highlightedNames = useMemo(() => {
    const sorted = [...data].sort(
      (a, b) => b.outYear - b.inYear - (a.outYear - a.inYear),
    );
    const topTenure = sorted
      .slice(0, TENURE_HIGHLIGHT_COUNT)
      .map((d) => d.name);
    const manualNames = MANUAL_HIGHLIGHTS.map((h) => h.name);
    return new Set([...topTenure, ...manualNames]);
  }, [data]);

  const highlightType = (name: string): "tenure" | "manual" | null => {
    if (manualHighlightMap.has(name)) return "manual";
    if (highlightedNames.has(name)) return "tenure";
    return null;
  };

  const getUrl = (name: string): string | undefined => {
    return manualHighlightMap.get(name)?.url;
  };

  // Filter by era
  const filteredData = useMemo(() => {
    if (!selectedEra) return data;
    const era = eras.find((e) => e.label === selectedEra);
    if (!era || !era.range) return data;
    const [lo, hi] = era.range;
    return data.filter((d) => d.inYear >= lo && d.inYear <= hi);
  }, [data, selectedEra]);

  // Dynamic SVG height
  const dynamicChartHeight = useMemo(() => {
    const minHeight = 500;
    const perDancer = 16;
    return Math.max(
      minHeight,
      filteredData.length * perDancer + margin.top + margin.bottom,
    );
  }, [filteredData, margin.top, margin.bottom]);

  const innerH = dynamicChartHeight - margin.top - margin.bottom;

  // Y scale from filtered data
  const yScale = useMemo(() => {
    const allYears = filteredData.flatMap((d) => [d.inYear, d.outYear]);
    const minYear = d3.min(allYears)!;
    const maxYear = d3.max(allYears)!;
    return d3
      .scaleLinear()
      .domain([minYear - 1, maxYear + 1])
      .range([0, innerH]);
  }, [filteredData, innerH]);

  const xLeft = 0;
  const xRight = innerW;

  // Render order: non-highlighted first, highlighted on top
  const sortedForRender = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      const aH = highlightedNames.has(a.name) ? 1 : 0;
      const bH = highlightedNames.has(b.name) ? 1 : 0;
      return aH - bH;
    });
  }, [filteredData, highlightedNames]);

  // Highlighted dancers for callout box
  const highlightedDancers = useMemo(() => {
    return data
      .filter((d) => highlightedNames.has(d.name))
      .sort((a, b) => b.outYear - b.inYear - (a.outYear - a.inYear));
  }, [data, highlightedNames]);

  // Smart grid ticks
  const gridTicks = useMemo(() => {
    const [domainMin, domainMax] = yScale.domain();
    const span = domainMax - domainMin;
    const ticks: number[] = [];

    let interval: number;
    if (span <= 15) interval = 1;
    else if (span <= 30) interval = 2;
    else if (span <= 50) interval = 5;
    else interval = 10;

    const start = Math.ceil(domainMin / interval) * interval;
    for (let yr = start; yr <= domainMax; yr += interval) {
      ticks.push(yr);
    }
    return ticks;
  }, [yScale]);

  return (
    <div
      style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        background: "#0f172a",
        padding: 24,
        borderRadius: 12,
      }}
    >
      {/* Title */}
      <h2 style={{ color: "#e2e8f0", margin: "0 0 4px 0", fontSize: 22 }}>
        Merce Cunningham Dance Company — Dancer Tenures
      </h2>
      <p style={{ color: "#94a3b8", margin: "0 0 16px 0", fontSize: 13 }}>
        Each line connects a dancer's{" "}
        <strong style={{ color: "#93c5fd" }}>year joined</strong> (left) to
        their <strong style={{ color: "#93c5fd" }}>year departed</strong>{" "}
        (right). Hover for details.
      </p>

      {/* Era filter buttons */}
      <div style={{ marginBottom: 16, display: "flex", gap: 8 }}>
        {eras.map((era) => (
          <button
            key={era.label}
            onClick={() => setSelectedEra(era.range ? era.label : null)}
            style={{
              padding: "6px 14px",
              borderRadius: 6,
              border: "none",
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 600,
              background:
                selectedEra === era.label || (!selectedEra && !era.range)
                  ? "#6366f1"
                  : "#1e293b",
              color:
                selectedEra === era.label || (!selectedEra && !era.range)
                  ? "#fff"
                  : "#94a3b8",
              transition: "all 0.2s",
            }}
          >
            {era.label}
          </button>
        ))}
      </div>

      {/* Legends row */}
      <div
        style={{ display: "flex", gap: 32, marginBottom: 12, flexWrap: "wrap" }}
      >
        <div
          style={{ display: "flex", gap: 16, fontSize: 12, color: "#94a3b8" }}
        >
          {[
            { color: "#bbb", label: "< 1 yr" },
            { color: "#93c5fd", label: "1–3 yrs" },
            { color: "#3b82f6", label: "4–8 yrs" },
            { color: "#6366f1", label: "9–15 yrs" },
            { color: "#a855f7", label: "16+ yrs" },
          ].map((item) => (
            <span
              key={item.label}
              style={{ display: "flex", alignItems: "center", gap: 6 }}
            >
              <span
                style={{
                  width: 24,
                  height: 3,
                  background: item.color,
                  display: "inline-block",
                  borderRadius: 2,
                }}
              />
              {item.label}
            </span>
          ))}
        </div>
        <div
          style={{ display: "flex", gap: 16, fontSize: 12, color: "#94a3b8" }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span
              style={{
                width: 24,
                height: 3,
                background: HIGHLIGHT_COLOR_TENURE,
                display: "inline-block",
                borderRadius: 2,
              }}
            />
            Top {TENURE_HIGHLIGHT_COUNT} longest tenures
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span
              style={{
                width: 24,
                height: 3,
                background: HIGHLIGHT_COLOR_MANUAL,
                display: "inline-block",
                borderRadius: 2,
              }}
            />
            Featured dancer
          </span>
        </div>
      </div>

      {/* Highlighted dancers callout with clickable links */}
      <div
        style={{
          background: "#1e293b",
          borderRadius: 8,
          padding: "12px 16px",
          marginBottom: 16,
          display: "flex",
          gap: 24,
          flexWrap: "wrap",
          fontSize: 12,
        }}
      >
        {highlightedDancers.map((d) => {
          const ht = highlightType(d.name);
          const color =
            ht === "manual" ? HIGHLIGHT_COLOR_MANUAL : HIGHLIGHT_COLOR_TENURE;
          const tenure = d.outYear - d.inYear;
          const url = getUrl(d.name);

          const nameContent = (
            <>
              {d.name}
              {url && <LinkIcon size={10} color={color} />}
              <span
                style={{ color: "#94a3b8", fontWeight: 400, marginLeft: 4 }}
              >
                {d.inYear}–{d.outYear} ({tenure} yr{tenure !== 1 ? "s" : ""})
              </span>
            </>
          );

          const sharedStyle: React.CSSProperties = {
            color,
            fontWeight: 600,
            cursor: "pointer",
            opacity: hoveredDancer && hoveredDancer !== d.name ? 0.4 : 1,
            transition: "opacity 0.2s",
            textDecoration: "none",
          };

          return url ? (
            <a
              key={d.name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={sharedStyle}
              onMouseEnter={() => setHoveredDancer(d.name)}
              onMouseLeave={() => setHoveredDancer(null)}
            >
              {nameContent}
            </a>
          ) : (
            <span
              key={d.name}
              style={sharedStyle}
              onMouseEnter={() => setHoveredDancer(d.name)}
              onMouseLeave={() => setHoveredDancer(null)}
            >
              {nameContent}
            </span>
          );
        })}
      </div>

      {/* SVG Chart */}
      <svg
        ref={svgRef}
        width={width}
        height={dynamicChartHeight}
        style={{ display: "block" }}
      >
        <rect width={width} height={dynamicChartHeight} fill="transparent" />

        <g transform={`translate(${margin.left},${margin.top})`}>
          {/* Axis labels */}
          <text
            x={xLeft}
            y={-20}
            textAnchor="middle"
            fill="#94a3b8"
            fontSize={13}
            fontWeight={700}
          >
            Year Joined
          </text>
          <text
            x={xRight}
            y={-20}
            textAnchor="middle"
            fill="#94a3b8"
            fontSize={13}
            fontWeight={700}
          >
            Year Left
          </text>

          {/* Grid lines */}
          {gridTicks.map((yr) => (
            <g key={`tick-${yr}`}>
              <line
                x1={xLeft - 8}
                x2={xRight + 8}
                y1={yScale(yr)}
                y2={yScale(yr)}
                stroke="#1e293b"
                strokeWidth={1}
              />
              <text
                x={xLeft - 14}
                y={yScale(yr) + 4}
                textAnchor="end"
                fill="#475569"
                fontSize={11}
              >
                {yr}
              </text>
              <text
                x={xRight + 14}
                y={yScale(yr) + 4}
                textAnchor="start"
                fill="#475569"
                fontSize={11}
              >
                {yr}
              </text>
            </g>
          ))}

          {/* Slope lines */}
          {sortedForRender.map((d) => {
            const isHovered = hoveredDancer === d.name;
            const ht = highlightType(d.name);
            const isHighlighted = ht !== null;
            const dimmed = hoveredDancer !== null && !isHovered;
            const url = getUrl(d.name);

            let stroke: string;
            if (ht === "manual") stroke = HIGHLIGHT_COLOR_MANUAL;
            else if (ht === "tenure") stroke = HIGHLIGHT_COLOR_TENURE;
            else stroke = tenureColor(d);

            let strokeW: number;
            if (isHovered) strokeW = 4;
            else if (isHighlighted) strokeW = 2.5;
            else strokeW = 1.5;

            let opacity: number;
            if (dimmed && !isHighlighted) opacity = 0.05;
            else if (dimmed && isHighlighted) opacity = 0.25;
            else if (isHovered) opacity = 1;
            else if (isHighlighted) opacity = 0.9;
            else opacity = 0.4;

            const tenure = d.outYear - d.inYear;

            return (
              <g
                key={d.name}
                onMouseEnter={() => setHoveredDancer(d.name)}
                onMouseLeave={() => setHoveredDancer(null)}
                style={{ cursor: url ? "pointer" : "default" }}
                onClick={() => {
                  if (url) window.open(url, "_blank", "noopener,noreferrer");
                }}
              >
                {/* Main line */}
                <line
                  x1={xLeft}
                  y1={yScale(d.inYear)}
                  x2={xRight}
                  y2={yScale(d.outYear)}
                  stroke={stroke}
                  strokeWidth={strokeW}
                  strokeOpacity={opacity}
                  style={{ transition: "all 0.2s" }}
                />

                {/* Left dot */}
                <circle
                  cx={xLeft}
                  cy={yScale(d.inYear)}
                  r={isHovered ? 6 : isHighlighted ? 4 : 2.5}
                  fill={stroke}
                  fillOpacity={opacity}
                  style={{ transition: "all 0.2s" }}
                />

                {/* Right dot */}
                <circle
                  cx={xRight}
                  cy={yScale(d.outYear)}
                  r={isHovered ? 6 : isHighlighted ? 4 : 2.5}
                  fill={stroke}
                  fillOpacity={opacity}
                  style={{ transition: "all 0.2s" }}
                />

                {/* Persistent label for highlighted dancers (when not hovered) */}
                {isHighlighted && !isHovered && (
                  <text
                    x={xRight + 16}
                    y={yScale(d.outYear) + 4}
                    textAnchor="start"
                    fill={stroke}
                    fillOpacity={dimmed ? 0.25 : 0.85}
                    fontSize={10}
                    fontWeight={600}
                    style={{
                      transition: "all 0.2s",
                      textDecoration: url ? "underline" : "none",
                      cursor: url ? "pointer" : "default",
                    }}
                  >
                    {d.name} ({tenure} yr{tenure !== 1 ? "s" : ""})
                    {url ? " ↗" : ""}
                  </text>
                )}

                {/* Hover labels */}
                {isHovered && (
                  <>
                    {/* Left label */}
                    <text
                      x={xLeft - 14}
                      y={yScale(d.inYear) + 4}
                      textAnchor="end"
                      fill="#e2e8f0"
                      fontSize={12}
                      fontWeight={700}
                    >
                      {d.name} ({d.inYear})
                    </text>

                    {/* Right label */}
                    <text
                      x={xRight + 16}
                      y={yScale(d.outYear) + 4}
                      textAnchor="start"
                      fill="#e2e8f0"
                      fontSize={12}
                      fontWeight={700}
                      style={{
                        textDecoration: url ? "underline" : "none",
                      }}
                    >
                      {d.name} ({d.outYear}){url ? " ↗" : ""}
                    </text>

                    {/* Duration badge at midpoint */}
                    <rect
                      x={innerW / 2 - 44}
                      y={(yScale(d.inYear) + yScale(d.outYear)) / 2 - 14}
                      width={88}
                      height={28}
                      rx={6}
                      fill="#0f172a"
                      stroke={stroke}
                      strokeWidth={1.5}
                    />
                    <text
                      x={innerW / 2}
                      y={(yScale(d.inYear) + yScale(d.outYear)) / 2 + 5}
                      textAnchor="middle"
                      fill={stroke}
                      fontSize={12}
                      fontWeight={700}
                    >
                      {tenure} year{tenure !== 1 ? "s" : ""}
                    </text>

                    {/* Click hint for linked dancers */}
                    {url && (
                      <text
                        x={innerW / 2}
                        y={(yScale(d.inYear) + yScale(d.outYear)) / 2 + 22}
                        textAnchor="middle"
                        fill="#94a3b8"
                        fontSize={9}
                      >
                        click to learn more
                      </text>
                    )}
                  </>
                )}

                {/* Invisible wider hit area */}
                <line
                  x1={xLeft}
                  y1={yScale(d.inYear)}
                  x2={xRight}
                  y2={yScale(d.outYear)}
                  stroke="transparent"
                  strokeWidth={10}
                />
              </g>
            );
          })}
        </g>
      </svg>

      <p style={{ color: "#475569", fontSize: 11, marginTop: 12 }}>
        Data: {filteredData.length} dancers shown · Merce Cunningham Dance
        Company (1942–2011)
      </p>
    </div>
  );
};

export default SlopeChart;
