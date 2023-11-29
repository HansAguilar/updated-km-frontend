import React from 'react'
import FileIcons from './FileIcons';
import { RiFileExcel2Fill } from 'react-icons/ri';
import { utils, writeFile } from 'xlsx';

function ServicesExcelFile({ users, title }) {
	const fields = ["name", "type", "description", "price"];

	const filteredPatients = users.map((user) => {
		const filteredData = {};
		fields.forEach(v => {
			filteredData[v.toUpperCase()] = user[v];
		})
		return filteredData;
	})

	const printExcel = () => {
		const wb = utils.book_new();
		let ws = utils.json_to_sheet(filteredPatients, {
			origin: 'A1', // Start adding data in row 2
		});

		ws['!cols'] = [{ width: 20 }, { width: 20 }, { width: 30 }, { width: 20 }];

		const currentDate = new Date();
		const options = { timeZone: 'Asia/Manila', month: 'short', day: 'numeric', year: 'numeric' };
		const formattedDate = currentDate.toLocaleDateString('en-US', options).replace(/ /g, '-'); // Format date as "Nov-25-2023"

		const fileName = `KmGeronimoDentalClinic-${formattedDate}-${title}.xlsx`;

		utils.book_append_sheet(wb, ws, `MySheet1`);
		writeFile(wb, fileName);
	}

	return (
		<FileIcons Icon={RiFileExcel2Fill} title={"Excel"} eventHandler={printExcel} />
	)
}

export default ServicesExcelFile