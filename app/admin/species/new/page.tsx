import SpeciesForm from '@/components/admin/SpeciesForm';

export default function NewSpeciesPage() {
	return (
		<div>
			<h1 className="text-2xl font-semibold text-gray-900 mb-6">Add New Species</h1>
			<div className="bg-white shadow overflow-hidden sm:rounded-md p-6">
				<SpeciesForm />
			</div>
		</div>
	);
}
