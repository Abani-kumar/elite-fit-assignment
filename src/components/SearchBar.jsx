import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '@/redux/taskSlice';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } 
  from '@/components/ui/select';

export default function SearchBar() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  const handleSearch = (value) => {
    setSearch(value);
    dispatch(setFilter({ search: value }));
  };


  const handlePriorityChange = (value) => {
    dispatch(setFilter({ priority: value === 'ALL' ? null : value }));
  };

  return (
    <div className="flex gap-2 w-full sm:w-auto">
      <Input
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full sm:w-[200px]"
      />
      <Select onValueChange={handlePriorityChange} defaultValue="ALL">
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All</SelectItem>
          <SelectItem value="HIGH">High</SelectItem>
          <SelectItem value="MEDIUM">Medium</SelectItem>
          <SelectItem value="LOW">Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
