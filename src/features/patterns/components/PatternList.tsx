import { usePatternsContext } from '../../../context/PatternsContext'
import PatternCard from './PatternCard'


export default function PatternList() {
    
    const { patterns, deletePattern } = usePatternsContext()
    
    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-4">
            {patterns.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-8">
                    No patterns logged yet.
                </p>
            ) : (
                patterns.map(pattern => (
                    <PatternCard
                        key={pattern.id}
                        pattern={pattern}
                        onDelete={deletePattern}
                    />
                ))
            )}
        </div>
    )
}
