class Book < ApplicationRecord
  belongs_to :user

  validates_presence_of :title, message: 'O título é obrigatório'
  validates_presence_of :author, message: 'O autor é obrigatório'
  validates_presence_of :publication_year, message: 'O ano de publicação é obrigatório'
end
