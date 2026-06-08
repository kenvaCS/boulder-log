import PatternList from '../features/patterns/components/PatternList'
import PatternForm from '../features/patterns/components/PatternForm'
import { PatternsProvider } from '../context/PatternsContext'


export default function PatternPage() {

    // no prop drilling because need for detail page, need for stats etc. -> context

    return (
        <PatternsProvider>
        <div className="flex flex-col gap-6">
            <div className="flex items-start gap-10">
                <div className="flex-1 min-w-0">
                    <PatternList />
                </div>
                <div className="w-100 shrink-0">
                    <PatternForm />
                </div>
            </div>
        </div>
        </PatternsProvider>
    )
}
