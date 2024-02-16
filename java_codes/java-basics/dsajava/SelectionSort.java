package dsajava;

public class SelectionSort {
	
	public void swapNum(int a, int b) {
		int temp = a;
		a = b;
		b = temp;
	}
	
    private static void selectionSort(int arr[],int n){
        
        for(int i=0;i<n;i++){
            int mini = i;
            System.out.print(arr[i]+",");
            for(int j=i+1;j<n;j++){
                if(arr[j]<arr[mini]){
                    mini = j;
                }
            }
            int temp = arr[mini];
            arr[mini] = arr[i];
            arr[i] = temp;
        }
        
    }
	
    public static void main(String[] args) {
        try{
        int[] arr = {13, 46, 24, 52, 20, 9};
        int n = arr.length;
        //numberPrint();
        for(int i=0;i<n;i++){
            System.out.println("single element "+arr[i]);
        }
        String newstr = "hello";
        newstr = "hi";
        System.out.println(newstr);
        }catch(Exception e){
            System.out.println("error occured "+e);
        } finally {
            System.out.println("The 'try catch' is finished.");
        }
  
    }

}
