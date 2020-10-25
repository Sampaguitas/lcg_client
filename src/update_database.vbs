Dim shell: Set shell=createobject("WScript.shell") 'Create shell object
Dim fso: Set fso = CreateObject("Scripting.FileSystemObject") 'Create filesystem object
Dim folder_this: Set folder_this = fso.GetFolder(fso.GetAbsolutePathName(".")) 'Get absolute path to this folder
Dim folder_parent: Set folder_parent = fso.GetFolder(fso.GetAbsolutePathName("..")) 'Get absolute path to parent folder
Dim file_log: Set file_log = fso.OpenTextFile(fso.BuildPath(folder_this, "logfile.txt"), 8) 'Logs when the script started / ended

Set excel = CreateObject("Excel.Application") 'Create an Excel Object
Set work_book = excel.Workbooks.Open(fso.BuildPath(folder_parent, "Tables implementation data.xls")) 'Open the Workbook

file_log.WriteLine("------------------- " & date() & " -------------------")
file_log.WriteLine(date() & " " & FormatDateTime(Now(),4) & " start extraction")

Call extract("Size", "_sizes.txt", 3, Array(2,3), TRUE, 7)
Call extract("Type", "_types.txt", 3, Array(3), TRUE, 8)
Call extract("Specification", "_specs.txt", 3, Array(3), TRUE, 7)
Call extract("Grade", "_grades.txt", 3, Array(3), TRUE, 7)
Call extract("Heattreatment", "_heats.txt", 2, Array(3), TRUE, 7)
Call extract("Length", "_lengths.txt", 3, Array(3), TRUE, 7)
Call extract("Ends", "_ends.txt", 2, Array(3), TRUE, 7)
Call extract("Surface", "_surfaces.txt", 2, Array(3), TRUE, 7)
Call extract("Other", "_others.txt", 3, Array(3), TRUE, 7)
Call extract("CDI", "_cdis.txt", 1, Array(3), FALSE, 7)
Call extract("Supplier", "_suppliers.txt", 1, Array(3), FALSE, 7)
Call extract("Certificates", "_certificates.txt", 1, Array(3), FALSE, 7)

Sub extract(sheet_name, output_name, lunar_length, columns, has_active, active_col)
	Set work_sheet = work_book.Worksheets(sheet_name)  'Refer to Worksheet
	Set output_file = fso.OpenTextFile(fso.BuildPath(folder_this, output_name), 2, True) 'Open Output File
	intRow = 2
	
	' Set validation = New RegExp 'Create validation pattern for Nr
	' With validation 
	' 	.Pattern = "^[0-9A-F]{1}$" 'Hex of specified length
	' 	.IgnoreCase = False 'Case sencitive
	' 	.Global     = False 'Only one match
	' End with

	Do Until work_sheet.Cells(intRow,1).Value = "" 'until end of file
		If has_active = FALSE Or work_sheet.Cells(intRow, active_col).Value = "Y" Then
			'If validation.Test(work_sheet.Cells(intRow, 1).Value) Then 'If Nr is properly formated
				this_line = work_sheet.Cells(intRow, 1).Value 'Add Nr to our line
				is_empty = TRUE
				For Each column In columns 'loop trough all defined columns
					this_line = this_line & vbTab & work_sheet.Cells(intRow, column).Value 'Add other params to our line
					If work_sheet.Cells(intRow, column).Value <> "" Then 'If one param is not empty
						is_empty = FALSE 'Set is_empty to false
					End If
				Next
				If is_empty = FALSE Then 'If we have at least one parameter which is not empty then wright line
					output_file.WriteLine(Replace(this_line, "µ", "u")) 'Wright line in out output_file
				End If
			' End If
		End If
	    intRow = intRow + 1
	Loop
	
	output_file.Close 'Close the Output file
	Set output_file = Nothing 'Release Output object
	Set work_sheet = Nothing 'Release Worksheet object
End Sub

file_log.WriteLine(date() & " " & FormatDateTime(Now(),4) & " stop extraction")
file_log.Close

shell.Run fso.BuildPath(folder_this, "\import.bat")

work_book.close 'Close the Workbook
Set work_book=Nothing 'Releasing Excel object
excel.Quit 'Exit from Excel Application
Set excel=Nothing 'Releasing Excel object
