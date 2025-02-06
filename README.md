### **Row Layout Algorithm**

**Objective:**

- **Maintain Image Proportion**: Do not stretch or compress images, keep the original aspect ratio.
- **Row Height Consistency**: Make each row's height as close as possible to the **target row height** (e.g., 300 pixels).
- **Utilize Space Efficiently**: Ensure each row of photos fills the container width (e.g., 1000 pixels) without leaving blank spaces.

---

### **Algorithm Steps**

#### **1. Collect Photo Information**

- **Aspect Ratio of Each Photo**: This is the width divided by the height of the photo.
    - **Example**: A photo with a width of 600 pixels and a height of 400 pixels has an aspect ratio of 600 ÷ 400 = **1.5**.

#### **2. Consider Possible Photo Combinations**

- **Possible Row Combinations**: We try to combine photos in different ways to form a row, such as:
    - Row 1: Photo 1
    - Row 2: Photo 1 and Photo 2
    - Row 3: Photo 1, Photo 2, and Photo 3
    - Row 4: Photo 2 and Photo 3
    - **And so on**

#### **3. Calculate the Height of Each Possible Row**

For each photo combination, we calculate the row height as follows:

1. **Calculate Total Aspect Ratio**

     - **Total Aspect Ratio** is the sum of the aspect ratios of all photos in the row.
         - **Example**: If the row contains Photo 1 (aspect ratio 1.5) and Photo 2 (aspect ratio 1.0), the total aspect ratio is 1.5 + 1.0 = **2.5**.

2. **Calculate Row Height**

     - **Row Height** is equal to the container width divided by the total aspect ratio.
         - **Example**: If the container width is 1000 pixels, row height = 1000 ÷ 2.5 = **400 pixels**.

3. **Evaluate the Difference Between Row Height and Target Row Height**

     - **Difference Value**: Row height minus target row height, indicating how much the row height deviates from the desired height.
         - **Example**: If the target row height is 300 pixels, difference value = 400 - 300 = **100 pixels**.

     - **Note**: We want this difference to be as small as possible, indicating the row height is close to the target row height.

#### **4. Calculate the "Cost" for Each Possible Row Combination**

- **Concept of Cost**: Cost represents the "expense" of using a particular photo combination to form a row, i.e., the degree of deviation from the target row height.

- **Method to Calculate Cost**:
    - We usually use the square of the difference value to represent the cost because:
        - The square of the difference is always positive, making it easy to compare.
        - For larger deviations, the square amplifies the cost, discouraging the selection of these combinations.

- **Example**:
    - Difference value of 100 pixels, cost = 100² = **10,000**.
    - Difference value of -50 pixels (row height below target row height), cost = (-50)² = **2,500**.

#### **5. Find the Optimal Photo Arrangement**

- **Core Idea**: By calculating the cost of all possible row combinations, we can find the photo arrangement with the smallest total cost.
    - **Total Cost**: The sum of the costs of all rows.

- **Implementation Method**:
    - **Try Each Combination**: Although there are many possible combinations, we can efficiently calculate and compare them using an algorithm.
    - **Choose the Path with the Lowest Cost**: Ultimately, select the combinations where the row height is closest to the target row height.

#### **6. Adjust Photo Sizes and Render**

- **Calculate Display Width for Each Photo**:

    - **Display Width** = Row height × Photo's aspect ratio.
        - **Example**: If the row height is 400 pixels and the photo's aspect ratio is 1.5, display width = 400 × 1.5 = **600 pixels**.

- **Render Photos**:

    - Apply the calculated dimensions to the photos, maintain proportions, and arrange them in a row.

---

### **A Specific Example**

Suppose we have the following 5 photos:

| Photo Number | Aspect Ratio |
|--------------|--------------|
| Photo 1      | 1.5          |
| Photo 2      | 1.0          |
| Photo 3      | 1.2          |
| Photo 4      | 0.8          |
| Photo 5      | 1.4          |

**Container Width**: 1000 pixels

**Target Row Height**: 300 pixels

**Steps**:

1. **Try Different Row Combinations**:

     - **Combination 1**: Photos 1, 2, and 3

         - Total aspect ratio: 1.5 + 1.0 + 1.2 = **3.7**
         - Row height: 1000 ÷ 3.7 ≈ **270 pixels**
         - Difference value: 270 - 300 = **-30 pixels**
         - Cost: (-30)² = **900**

     - **Combination 2**: Photos 4 and 5

         - Total aspect ratio: 0.8 + 1.4 = **2.2**
         - Row height: 1000 ÷ 2.2 ≈ **455 pixels**
         - Difference value: 455 - 300 = **155 pixels**
         - Cost: (155)² = **24,025**

2. **Compare Costs**:

     - Combination 1 has a cost of 900, Combination 2 has a cost of 24,025.
     - Clearly, Combination 1 is closer to the target row height.

3. **Determine the Best Arrangement**:

     - We might choose to place Photos 1, 2, and 3 in the first row, and Photos 4 and 5 in the second row.
     - Total cost is 900 (first row) + 24,025 (second row) = **24,925**.

4. **Try Other Combinations**:

     - If we try placing Photos 1 and 2 in the first row, and Photos 3, 4, and 5 in the second row, we might get a smaller total cost.

5. **Final Selection**:

     - After comparison, we choose the photo arrangement with the smallest total cost.

---

### **Key Points Summary**

- **Smaller Cost** indicates the row height is closer to the target row height, resulting in a more ideal layout.
- **Squared Cost** penalizes larger deviations more, encouraging the algorithm to choose rows with more balanced heights.
- **Maintain Aspect Ratio** to ensure photos are not distorted and present the best visual effect.

---

### **Why Do This?**

- **User Experience**: A photo wall with consistent row heights looks more organized and aesthetically pleasing, enhancing the user's browsing experience.
- **Performance Optimization**: The algorithm automatically finds the best photo arrangement, saving the hassle of manual adjustments.
- **Adapt to Different Photo Sizes**: Regardless of the aspect ratio of the photos, the layout can automatically adjust to form a harmonious arrangement.