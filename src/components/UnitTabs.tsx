// src/components/UnitTabs.tsx
interface UnitTabsProps {
  units: { id: number; title: string }[]
  activeUnit: number
  completedUnits: number[]
  onSelect: (id: number) => void
}

export default function UnitTabs({ units, activeUnit, completedUnits, onSelect }: UnitTabsProps) {
  return (
    <div className="bg-white rounded-xl p-1 border border-[#E2E8F0] overflow-x-auto">
      <div className="flex min-w-max">
        {units.map((unit) => {
          const isComplete = completedUnits.includes(unit.id)
          const isActive = unit.id === activeUnit

          return (
            <button
              key={unit.id}
              onClick={() => onSelect(unit.id)}
              className={`flex-1 min-w-[80px] p-2.5 rounded-lg text-center m-0.5 transition-all ${
                isComplete
                  ? 'bg-[#DCFCE7]'
                  : isActive
                  ? 'bg-[#FCC30A]'
                  : 'bg-[#F8FAFC]'
              }`}
            >
              <div className={`text-[10px] font-semibold ${
                isComplete ? 'text-[#10B981]' : isActive ? 'text-white' : 'text-[#94A3B8]'
              }`}>
                UNIT {unit.id}
              </div>
              <div className={`text-[11px] mt-0.5 ${
                isComplete ? 'text-[#10B981]' : isActive ? 'text-white font-semibold' : 'text-[#94A3B8]'
              }`}>
                {unit.title}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
