
function SingleStudentCheck(Student_array_list)
{
let Single_student_number=0;
let arraySampleList= new Array();
arraySampleList=[...Student_array_list];  // Push/copy array of data to the another array

    for(i=0;i<Student_array_list.length;i++)
    {
        let student_number=0;
        for(j=0;j<Student_array_list.length;j++)
            {
        if((Student_array_list[i]===Student_array_list[j]) && i!==j)
            student_number=Student_array_list[i];
        }
        if(student_number!==Student_array_list[i])
        Single_student_number=Student_array_list[i];
    }
    return Single_student_number;
}
function SingleStudentCheck_effective(Student_array_list)
{
    let Single_student_number=0;
    for(i=0;i<Student_array_list.length;i++)
    {
        Single_student_number^=Student_array_list[i];
    }
    return Single_student_number;
}
function printData(data)
{
    const outputElement = document.getElementById('ProductArrayCalc_response-message');
    outputElement.innerHTML = `<p>Single Student team number: ${data}</p>`;
}

let res=SingleStudentCheck([2,6,5,6,2]);
printData(res);
        const contactForm = document.getElementById('contact-form');
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
          
            const formData = new FormData(contactForm);
            console.log(formData);
            let arrays=new Array();
            arrays=document.getElementById('txt-output').value;
            res=SingleStudentCheck_effective.apply(this,arrays.split(","));  //Pushing string as an array
            res=SingleStudentCheck_effective(arrays.split(","));
            printData(res);
        });
        