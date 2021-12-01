class AddImageToBooks < ActiveRecord::Migration[6.1]
  def change
    add_column :books, :image, :string
  end
end
